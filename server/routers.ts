import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";
import { getRelevantContext } from "./rag";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Teachers
  teachers: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllTeachers();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getTeacherById(input.id);
      }),
    
    getByTeacherId: publicProcedure
      .input(z.object({ teacherId: z.string() }))
      .query(async ({ input }) => {
        return await db.getTeacherByTeacherId(input.teacherId);
      }),
    
    getByPhase: publicProcedure
      .input(z.object({ phase: z.number().min(1).max(6) }))
      .query(async ({ input }) => {
        return await db.getTeachersByPhase(input.phase);
      }),
    
    getKeyIdeas: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ input }) => {
        return await db.getKeyIdeasByTeacher(input.teacherId);
      }),
    
    getPractices: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ input }) => {
        return await db.getPracticesByTeacher(input.teacherId);
      }),
    
    getCentralQuestions: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ input }) => {
        return await db.getCentralQuestionsByTeacher(input.teacherId);
      }),
    
    getMisunderstandings: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ input }) => {
        return await db.getMisunderstandingsByTeacher(input.teacherId);
      }),
  }),

  // Themes
  themes: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllThemes();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getThemeById(input.id);
      }),
  }),

  // Quotes
  quotes: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllQuotes();
    }),
    
    getByTeacher: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ input }) => {
        return await db.getQuotesByTeacher(input.teacherId);
      }),
    
    getFeatured: publicProcedure.query(async () => {
      return await db.getFeaturedQuotes();
    }),
    
    getRandom: publicProcedure.query(async () => {
      return await db.getRandomQuote();
    }),
  }),

  // Journeys
  journeys: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllJourneys();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getJourneyById(input.id);
      }),
    
    getDays: publicProcedure
      .input(z.object({ journeyId: z.number() }))
      .query(async ({ input }) => {
        return await db.getJourneyDays(input.journeyId);
      }),
    
    getProgress: protectedProcedure
      .input(z.object({ journeyId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserJourneyProgress(ctx.user.id, input.journeyId);
      }),
    
    getAllProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getAllUserJourneyProgress(ctx.user.id);
    }),
  }),

  // Journal
  journal: router({
    getEntries: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserJournalEntries(ctx.user.id, input.limit);
      }),
    
    createEntry: protectedProcedure
      .input(z.object({
        type: z.enum(["quote", "conversation", "reflection", "note"]),
        content: z.string(),
        tags: z.array(z.string()).optional(),
        relatedTeacherIds: z.array(z.number()).optional(),
        relatedThemeIds: z.array(z.string()).optional(),
        conversationId: z.number().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createJournalEntry({
          userId: ctx.user.id,
          ...input,
        });
      }),
  }),

  // Conversations
  conversations: router({
    getAll: protectedProcedure
      .input(z.object({ limit: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getUserConversations(ctx.user.id, input.limit);
      }),
    
    getById: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        const conversation = await db.getConversationById(input.id);
        if (!conversation || conversation.userId !== ctx.user.id) {
          throw new Error("Conversation not found");
        }
        return conversation;
      }),
    
    getMessages: protectedProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ ctx, input }) => {
        const conversation = await db.getConversationById(input.conversationId);
        if (!conversation || conversation.userId !== ctx.user.id) {
          throw new Error("Conversation not found");
        }
        return await db.getConversationMessages(input.conversationId);
      }),
    
    create: protectedProcedure
      .input(z.object({
        mode: z.enum(["one_sage", "compare_two", "council"]),
        selectedTeachers: z.array(z.number()),
        metadata: z.record(z.string(), z.any()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createConversation({
          userId: ctx.user.id,
          ...input,
          isFlagged: false,
        });
      }),
    
    addMessage: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
        role: z.enum(["user", "assistant", "system"]),
        content: z.string(),
        teacherId: z.number().optional(),
        metadata: z.record(z.string(), z.any()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const conversation = await db.getConversationById(input.conversationId);
        if (!conversation || conversation.userId !== ctx.user.id) {
          throw new Error("Conversation not found");
        }
        return await db.addConversationMessage(input);
      }),
  }),

  // AI Chat
  chat: router({
    sendMessage: protectedProcedure
      .input(z.object({
        conversationId: z.number(),
        message: z.string(),
        mode: z.enum(["one_sage", "compare_two", "council"]),
        selectedTeachers: z.array(z.number()),
        tone: z.enum(["gentle", "balanced", "direct"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Verify conversation ownership
        const conversation = await db.getConversationById(input.conversationId);
        if (!conversation || conversation.userId !== ctx.user.id) {
          throw new Error("Conversation not found");
        }

        // Add user message
        await db.addConversationMessage({
          conversationId: input.conversationId,
          role: "user",
          content: input.message,
        });

        // Get conversation history
        const messages = await db.getConversationMessages(input.conversationId);
        
        // Get teacher information
        const teacherData = await Promise.all(
          input.selectedTeachers.map(async id => await db.getTeacherById(id))
        );

        // Build context for AI
        const teacherContext = teacherData
          .filter(t => t !== null)
          .map(t => `${t!.fullName}: ${t!.oneLineEssence}`)
          .join("\n");

        // Get relevant context using RAG
        let relevantContext = "";
        try {
          relevantContext = await getRelevantContext(
            input.message, 
            input.selectedTeachers, 
            5
          );
        } catch (error) {
          console.error("RAG context retrieval failed:", error);
        }

        // Build system prompt based on mode
        let systemPrompt = "";
        if (input.mode === "one_sage") {
          systemPrompt = `You are channeling the wisdom of ${teacherData[0]?.fullName}. ${teacherData[0]?.shortSummary}\n\nRespond to the user's question in the style and perspective of this teacher. Ground your response in their teachings and philosophy. Be clear that this is an AI synthesis of their teachings, not the literal teacher.`;
        } else if (input.mode === "compare_two") {
          systemPrompt = `You are presenting the perspectives of two teachers: ${teacherData.map(t => t?.fullName).join(" and ")}.\n\nFor each teacher, provide their unique perspective on the user's question. Then provide a brief comparison highlighting convergences and differences.`;
        } else if (input.mode === "council") {
          systemPrompt = `You are facilitating a council of sages including: ${teacherData.map(t => t?.fullName).join(", ")}.\n\nProvide perspectives from each teacher (2-3 paragraphs each), then synthesize a common thread and suggest one small action the user can try today.`;
        }

        // Add tone guidance
        const toneGuidance = input.tone === "gentle" 
          ? "Use a gentle, compassionate tone."
          : input.tone === "direct"
          ? "Be direct and clear, without unnecessary softening."
          : "Use a balanced, clear tone.";

        systemPrompt += `\n\n${toneGuidance}`;

        // Add RAG context if available
        if (relevantContext) {
          systemPrompt += `\n\nRELEVANT TEACHINGS FROM THE SELECTED TEACHERS:\n${relevantContext}\n\nDraw upon these specific teachings when formulating your response. Cite them naturally.`;
        }

        // Call LLM
        const response = await invokeLLM({
          messages: [
            { role: "system", content: systemPrompt },
            ...messages.slice(-10).map(m => ({
              role: m.role as "user" | "assistant" | "system",
              content: m.content as string,
            })),
          ],
        });

        const aiResponseContent = response.choices[0]?.message?.content;
        const aiResponse = typeof aiResponseContent === 'string' 
          ? aiResponseContent 
          : "I apologize, but I'm unable to respond at this moment.";

        // Save AI response
        await db.addConversationMessage({
          conversationId: input.conversationId,
          role: "assistant",
          content: aiResponse,
          teacherId: input.mode === "one_sage" ? input.selectedTeachers[0] : undefined,
        });

        // Track analytics
        await db.trackAnalytics("chat_message", ctx.user.id, {
          mode: input.mode,
          teachers: input.selectedTeachers,
        });

        return {
          response: aiResponse,
        };
      }),
  }),

  // Analytics
  analytics: router({
    track: publicProcedure
      .input(z.object({
        eventType: z.string(),
        metadata: z.record(z.string(), z.any()).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        await db.trackAnalytics(
          input.eventType,
          ctx.user?.id ?? null,
          input.metadata ?? {}
        );
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
