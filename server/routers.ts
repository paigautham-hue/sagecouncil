import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";
import { getRelevantContext } from "./rag";
import * as aiService from "./ai-service";
import { getTodaysDrop } from "./daily-drop";

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
    
    getBiography: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ input }) => {
        return await db.getTeacherBiography(input.teacherId);
      }),
    
    getIntegrationGuide: publicProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ input }) => {
        return await db.getIntegrationGuide(input.teacherId);
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

  // Today's Deep Drop
  daily: router({
    getTodaysDrop: publicProcedure.query(async () => {
      return await getTodaysDrop();
    }),
  }),

  // AI Chat
  chat: router({
    // Get reflection prompt before answering
    getReflectionPrompt: protectedProcedure
      .input(z.object({ question: z.string() }))
      .query(async ({ input }) => {
        return await aiService.generateReflectionPrompt(input.question);
      }),
    
    // Select teachers for Council mode
    selectTeachers: protectedProcedure
      .input(z.object({ question: z.string() }))
      .query(async ({ input }) => {
        const allTeachers = await db.getAllTeachers();
        const teachersForSelection = allTeachers.map(t => ({
          id: t.id,
          fullName: t.fullName,
          tradition: t.traditionTags?.join(', ') || '',
          themes: '' // Themes will be retrieved from database when needed
        }));
        return await aiService.selectTeachersForQuestion(input.question, teachersForSelection);
      }),
    
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

        // Check for crisis keywords
        const isCrisis = aiService.detectCrisis(input.message);
        if (isCrisis) {
          const crisisResponse = await aiService.generateCrisisResponse();
          
          // Add user message
          await db.addConversationMessage({
            conversationId: input.conversationId,
            role: "user",
            content: input.message,
          });
          
          // Add crisis response
          await db.addConversationMessage({
            conversationId: input.conversationId,
            role: "assistant",
            content: crisisResponse,
          });
          
          return { response: crisisResponse, isCrisis: true };
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

  // Deep Questions (Deep Question Ladder feature)
  deepQuestions: router({
    getDailyQuestion: publicProcedure.query(async () => {
      return await db.getDailyDeepQuestion();
    }),
    
    submitAnswer: protectedProcedure
      .input(z.object({
        questionId: z.number(),
        depthLevel: z.number().min(1).max(3),
        userAnswer: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        // Get the question details
        const question = await db.getDeepQuestionById(input.questionId);
        if (!question) {
          throw new Error('Question not found');
        }
        
        // Generate Council response using AI
        const councilResponse = await aiService.generateDeepQuestionResponse(
          question.questionText,
          input.userAnswer,
          question.themeId,
          question.teacherIds
        );
        
        // Save to journal
        const journalEntryId = await db.createJournalEntry({
          userId: ctx.user.id,
          type: 'deep_question',
          content: input.userAnswer,
          deepQuestionId: input.questionId,
          userAnswerText: input.userAnswer,
          councilResponseText: councilResponse,
          relatedThemeIds: question.themeId ? [question.themeId] : [],
          tags: [`depth-level-${input.depthLevel}`],
        });
        
        return {
          journalEntryId,
          councilResponse,
        };
      }),
    
    getAll: publicProcedure.query(async () => {
      return await db.getAllDeepQuestions();
    }),
    
    create: protectedProcedure
      .input(z.object({
        questionText: z.string(),
        themeId: z.string().optional(),
        difficulty: z.number().min(1).max(10),
        teacherIds: z.array(z.number()).optional(),
        tags: z.array(z.string()).optional(),
      }))
      .mutation(async ({ input }) => {
        return await db.createDeepQuestion(input);
      }),
  }),

  // Life Experiments
  lifeExperiments: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllLifeExperiments();
    }),
    
    getUserLogs: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserExperimentLogs(ctx.user.id);
    }),
    
    startExperiment: protectedProcedure
      .input(z.object({ experimentId: z.number() }))
      .mutation(async ({ input, ctx }) => {
        const startDate = new Date().toISOString().split('T')[0];
        
        const logId = await db.createExperimentLog({
          userId: ctx.user.id,
          experimentId: input.experimentId,
          status: 'active',
          startDate: startDate as any,
          checkInEntries: [],
        });
        
        return { logId };
      }),
  }),

  // Paradox Playground
  paradoxPlayground: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllParadoxes();
    }),
    
    getUserReflections: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserParadoxReflections(ctx.user.id);
    }),
    
    submitReflection: protectedProcedure
      .input(z.object({
        paradoxId: z.number(),
        userReflection: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Simple AI response (no complex generation for speed)
        const aiResponse = `Thank you for exploring this paradox. Your reflection reveals deep engagement with the tension between these seemingly contradictory truths. Consider: what if both sides are simultaneously true? What opens up when you hold this paradox without needing to resolve it?`;
        
        const reflectionId = await db.createParadoxReflection({
          userId: ctx.user.id,
          paradoxId: input.paradoxId,
          userReflection: input.userReflection,
          aiResponse,
        });
        
        return { reflectionId, aiResponse };
      }),
  }),

  // Story Alchemy
  storyAlchemy: router({
    getUserStories: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserStories(ctx.user.id);
    }),
    
    getStoryById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getStoryById(input.id);
      }),
    
    generateStory: protectedProcedure
      .input(z.object({
        journalEntryId: z.number().optional(),
        journalContent: z.string(),
        teacherId: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        // Get teacher info
        const allTeachers = await db.getAllTeachers();
        const teacher = allTeachers.find(t => t.teacherId === input.teacherId);
        if (!teacher) {
          throw new Error('Teacher not found');
        }
        
        // Generate story
        const { title, storyContent } = await aiService.generateStoryFromJournal(
          input.journalContent,
          teacher.teacherId,
          teacher.fullName,
          teacher.oneLineEssence || ''
        );
        
        // Save story
        const storyId = await db.createStory({
          userId: ctx.user.id,
          journalEntryId: input.journalEntryId,
          teacherId: input.teacherId,
          originalContent: input.journalContent,
          storyContent,
          title,
        });
        
        return { storyId, title, storyContent };
      }),
  }),

  // Shadow Mirror
  shadowMirror: router({
    getSummaries: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserShadowMirrorSummaries(ctx.user.id);
    }),
    
    getLatest: protectedProcedure.query(async ({ ctx }) => {
      return await db.getLatestShadowMirrorSummary(ctx.user.id);
    }),
    
    generateWeeklySummary: protectedProcedure.mutation(async ({ ctx }) => {
      // Calculate last week's date range
      const now = new Date();
      const weekEndDate = new Date(now);
      weekEndDate.setDate(now.getDate() - now.getDay()); // Last Sunday
      const weekStartDate = new Date(weekEndDate);
      weekStartDate.setDate(weekEndDate.getDate() - 6); // Previous Monday
      
      // Get user's content from last week
      const { journalEntries, conversationMessages } = await db.getUserContentForWeek(
        ctx.user.id,
        weekStartDate,
        weekEndDate
      );
      
      // Generate AI summary
      const summary = await aiService.generateShadowMirrorSummary(
        journalEntries,
        conversationMessages
      );
      
      // Save summary
      const summaryId = await db.createShadowMirrorSummary({
        userId: ctx.user.id,
        weekStartDate: weekStartDate.toISOString().split('T')[0] as any,
        weekEndDate: weekEndDate.toISOString().split('T')[0] as any,
        ...summary,
      });
      
      return { summaryId, ...summary };
    }),
  }),

  // Micro-Retreats
  microRetreats: router({
    getAll: publicProcedure.query(async () => {
      return await db.getAllMicroRetreats();
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getMicroRetreatById(input.id);
      }),
    
    saveSession: protectedProcedure
      .input(z.object({
        retreatId: z.number(),
        reflectionNotes: z.string().optional(),
        rating: z.number().min(1).max(5).optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        return await db.saveRetreatSession({
          userId: ctx.user.id,
          retreatId: input.retreatId,
          reflectionNotes: input.reflectionNotes,
          rating: input.rating,
        });
      }),
    
    getUserSessions: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserRetreatSessions(ctx.user.id);
    }),
  }),

  // Council Debates
  debates: router({
    getWeekly: publicProcedure.query(async () => {
      return await db.getWeeklyDebate();
    }),
    
    getAll: publicProcedure.query(async () => {
      return await db.getAllDebates();
    }),
    
    create: protectedProcedure
      .input(z.object({
        questionText: z.string(),
        themeId: z.string().optional(),
        teacherIds: z.array(z.number()).min(3).max(5),
      }))
      .mutation(async ({ input }) => {
        // Get teacher details
        const teacherDetails = await Promise.all(
          input.teacherIds.map(async (id) => {
            const teacher = await db.getTeacherById(id);
            const keyIdeas = await db.getKeyIdeasByTeacher(id);
            return {
              id,
              fullName: teacher?.fullName || 'Unknown',
              tradition: teacher?.oneLineEssence || teacher?.mediumSummary || '',
              keyIdeas: keyIdeas.map(k => k.name + ': ' + (k.clearExplanation || '')).join('; ')
            };
          })
        );
        
        // Generate debate
        const { teacherResponses, synthesis } = await aiService.generateCouncilDebate(
          input.questionText,
          input.teacherIds,
          teacherDetails
        );
        
        // Calculate week number
        const now = new Date();
        const startOfYear = new Date(now.getFullYear(), 0, 1);
        const weekNumber = Math.ceil(((now.getTime() - startOfYear.getTime()) / 86400000 + startOfYear.getDay() + 1) / 7);
        
        // Save debate
        const debateId = await db.createDebate({
          questionText: input.questionText,
          themeId: input.themeId,
          teacherIds: input.teacherIds,
          teacherResponses,
          synthesis,
          weekNumber,
          year: now.getFullYear(),
        });
        
        return { debateId, teacherResponses, synthesis };
      }),
  }),

  // Inner Constellation
  constellation: router({
    getData: protectedProcedure.query(async ({ ctx }) => {
      return await db.getConstellationData(ctx.user.id);
    }),
    
    trackThemeInteraction: protectedProcedure
      .input(z.object({ themeId: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await db.incrementThemeInteraction(ctx.user.id, input.themeId);
        return { success: true };
      }),
  }),

  // Sage Favorites
  favorites: router({
    getAll: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserFavoritesWithTeachers(ctx.user.id);
    }),
    
    isFavorited: protectedProcedure
      .input(z.object({ teacherId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.isSageFavorited(ctx.user.id, input.teacherId);
      }),
    
    add: protectedProcedure
      .input(z.object({ teacherId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.addSageFavorite(ctx.user.id, input.teacherId);
      }),
    
    remove: protectedProcedure
      .input(z.object({ teacherId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await db.removeSageFavorite(ctx.user.id, input.teacherId);
        return { success: true };
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
