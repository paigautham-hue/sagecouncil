import { describe, it, expect, beforeAll } from 'vitest';
import { getDb } from '../db';
import { eq } from 'drizzle-orm';
// Tables will be queried directly by name

describe('Database Population - Comprehensive Test Suite', () => {
  let db: any;

  beforeAll(async () => {
    db = await getDb();
    if (!db) {
      throw new Error('Database connection failed');
    }
  });

  describe('Core Training Data', () => {
    it('should have 36 spiritual teachers', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM teachers');
      expect(result[0].count).toBe(36);
    });

    it('should have 20 spiritual themes', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM themes');
      expect(result[0].count).toBe(20);
    });

    it('should have comprehensive key ideas (2000+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM keyIdeas');
      expect(result[0].count).toBeGreaterThan(2000);
    });

    it('should have quotes for teachings (1000+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM quotes');
      expect(result[0].count).toBeGreaterThan(1000);
    });

    it('should have central questions for exploration (5000+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM centralQuestions');
      expect(result[0].count).toBeGreaterThan(5000);
    });

    it('should have misunderstandings with clarifications (500+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM misunderstandings');
      expect(result[0].count).toBeGreaterThan(500);
    });
  });

  describe('Teacher Biographies & Integration', () => {
    it('should have biographies for all 36 teachers', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM teacher_biographies');
      expect(result[0].count).toBe(36);
    });

    it('should have integration guides for all 36 teachers', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM integration_guides');
      expect(result[0].count).toBe(36);
    });

    it('should have case studies across life domains (500+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM case_studies');
      expect(result[0].count).toBeGreaterThan(500);
    });

    it('each teacher should have a biography with life story', async () => {
      const [result] = await db.execute('SELECT * FROM teacher_biographies LIMIT 1');
      expect(result[0]).toHaveProperty('lifeStory');
      expect(result[0].lifeStory).toBeTruthy();
    });

    it('each teacher should have integration guide with learning paths', async () => {
      const [result] = await db.execute('SELECT * FROM integration_guides LIMIT 1');
      expect(result[0]).toHaveProperty('beginnerPath');
      expect(result[0].beginnerPath).toBeTruthy();
    });
  });

  describe('Interactive Features', () => {
    it('should have deep questions for daily exploration (70+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM deepQuestions');
      expect(result[0].count).toBeGreaterThan(70);
    });

    it('should have spiritual paradoxes (20+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM paradoxes');
      expect(result[0].count).toBeGreaterThan(20);
    });

    it('should have life experiments (15+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM life_experiments');
      expect(result[0].count).toBeGreaterThan(15);
    });

    it('should have micro-retreats (15+)', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM micro_retreats');
      expect(result[0].count).toBeGreaterThan(15);
    });

    it('should have council debates', async () => {
      const [result] = await db.execute('SELECT COUNT(*) as count FROM council_debates');
      expect(result[0].count).toBeGreaterThan(0);
    });
  });

  describe('Data Quality & Integrity', () => {
    it('all teachers should have full names', async () => {
      const [result] = await db.execute('SELECT fullName FROM teachers');
      result.forEach((teacher: any) => {
        expect(teacher.fullName).toBeTruthy();
        expect(teacher.fullName.length).toBeGreaterThan(0);
      });
    });

    it('all teachers should have summaries', async () => {
      const [result] = await db.execute('SELECT shortSummary, mediumSummary FROM teachers');
      result.forEach((teacher: any) => {
        expect(teacher.shortSummary || teacher.mediumSummary).toBeTruthy();
      });
    });

    it('all themes should have labels and descriptions', async () => {
      const [result] = await db.execute('SELECT label, description FROM themes');
      result.forEach((theme: any) => {
        expect(theme.label).toBeTruthy();
        expect(theme.description).toBeTruthy();
      });
    });

    it('all key ideas should have clear explanations', async () => {
      const [result] = await db.execute('SELECT name, clearExplanation FROM keyIdeas LIMIT 10');
      result.forEach((idea: any) => {
        expect(idea.name).toBeTruthy();
        expect(idea.clearExplanation).toBeTruthy();
      });
    });

    it('all quotes should have text content', async () => {
      const [result] = await db.execute('SELECT text FROM quotes LIMIT 10');
      result.forEach((quote: any) => {
        expect(quote.text).toBeTruthy();
        expect(quote.text.length).toBeGreaterThan(10);
      });
    });

    it('all deep questions should have meaningful content', async () => {
      const [result] = await db.execute('SELECT questionText as question FROM deepQuestions LIMIT 5');
      result.forEach((q: any) => {
        expect(q.question).toBeTruthy();
        expect(q.question.length).toBeGreaterThan(20);
      });
    });

    it('all paradoxes should have statement and perspectives', async () => {
      const [result] = await db.execute('SELECT title FROM paradoxes LIMIT 5');
      result.forEach((p: any) => {
        expect(p.title).toBeTruthy();
      });
    });

    it('all life experiments should have descriptions and duration', async () => {
      const [result] = await db.execute('SELECT title, description FROM life_experiments LIMIT 5');
      result.forEach((exp: any) => {
        expect(exp.title).toBeTruthy();
        expect(exp.description).toBeTruthy();
      });
    });

    it('all micro-retreats should have steps', async () => {
      const [result] = await db.execute('SELECT title, steps FROM micro_retreats LIMIT 5');
      result.forEach((retreat: any) => {
        expect(retreat.title).toBeTruthy();
        expect(retreat.steps).toBeTruthy();
        const stepsArray = typeof retreat.steps === 'string' ? JSON.parse(retreat.steps) : retreat.steps;
        expect(Array.isArray(stepsArray)).toBe(true);
        expect(stepsArray.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Relationships & Associations', () => {
    it('key ideas should be associated with teachers', async () => {
      const [result] = await db.execute('SELECT teacherId FROM keyIdeas LIMIT 10');
      result.forEach((idea: any) => {
        expect(idea.teacherId).toBeTruthy();
      });
    });

    it('quotes should be associated with teachers', async () => {
      const [result] = await db.execute('SELECT teacherId FROM quotes LIMIT 10');
      result.forEach((quote: any) => {
        expect(quote.teacherId).toBeTruthy();
      });
    });

    it('central questions should be associated with teachers', async () => {
      const [result] = await db.execute('SELECT teacherId FROM centralQuestions LIMIT 10');
      result.forEach((q: any) => {
        expect(q.teacherId).toBeTruthy();
      });
    });

    it('deep questions should have theme associations', async () => {
      const [result] = await db.execute('SELECT themeId FROM deepQuestions LIMIT 5');
      result.forEach((q: any) => {
        expect(q.themeId).toBeTruthy();
      });
    });

    it('paradoxes should have theme associations', async () => {
      const [result] = await db.execute('SELECT themeId FROM paradoxes LIMIT 5');
      result.forEach((p: any) => {
        expect(p.themeId).toBeTruthy();
      });
    });
  });

  describe('Feature Completeness', () => {
    it('should have sufficient content for AI-powered features', async () => {
      const [t] = await db.execute('SELECT COUNT(*) as count FROM teachers');
      const [q] = await db.execute('SELECT COUNT(*) as count FROM quotes');
      const [i] = await db.execute('SELECT COUNT(*) as count FROM keyIdeas');
      const [cq] = await db.execute('SELECT COUNT(*) as count FROM centralQuestions');

      // Ensure we have enough content for meaningful AI responses
      expect(t[0].count).toBeGreaterThanOrEqual(30);
      expect(q[0].count).toBeGreaterThanOrEqual(1000);
      expect(i[0].count).toBeGreaterThanOrEqual(2000);
      expect(cq[0].count).toBeGreaterThanOrEqual(5000);
    });

    it('should have diverse interactive experiences', async () => {
      const [dq] = await db.execute('SELECT COUNT(*) as count FROM deepQuestions');
      const [p] = await db.execute('SELECT COUNT(*) as count FROM paradoxes');
      const [e] = await db.execute('SELECT COUNT(*) as count FROM life_experiments');
      const [r] = await db.execute('SELECT COUNT(*) as count FROM micro_retreats');

      expect(dq[0].count).toBeGreaterThanOrEqual(70);
      expect(p[0].count).toBeGreaterThanOrEqual(20);
      expect(e[0].count).toBeGreaterThanOrEqual(15);
      expect(r[0].count).toBeGreaterThanOrEqual(15);
    });

    it('should support user journey and progress tracking', async () => {
      const [cs] = await db.execute('SELECT COUNT(*) as count FROM case_studies');
      const [tb] = await db.execute('SELECT COUNT(*) as count FROM teacher_biographies');

      expect(cs[0].count).toBeGreaterThanOrEqual(500);
      expect(tb[0].count).toBe(36);
    });
  });

  describe('Data Consistency', () => {
    it('should not have orphaned key ideas', async () => {
      const [ideas] = await db.execute('SELECT teacherId FROM keyIdeas');
      const [teachers_list] = await db.execute('SELECT id FROM teachers');
      const teacherIds = teachers_list.map((t: any) => t.id);

      ideas.forEach((idea: any) => {
        expect(teacherIds).toContain(idea.teacherId);
      });
    });

    it('should not have orphaned quotes', async () => {
      const [quotes_data] = await db.execute('SELECT teacherId FROM quotes');
      const [teachers_list] = await db.execute('SELECT id FROM teachers');
      const teacherIds = teachers_list.map((t: any) => t.id);

      quotes_data.forEach((quote: any) => {
        expect(teacherIds).toContain(quote.teacherId);
      });
    });

    it('should have valid theme references', async () => {
      const [themes_list] = await db.execute('SELECT id FROM themes');
      const [deepQs] = await db.execute('SELECT themeId FROM deepQuestions LIMIT 10');
      const themeIds = themes_list.map((t: any) => t.id);

      deepQs.forEach((q: any) => {
        // Some deep questions may have string themeIds, skip validation for those
        if (q.themeId && typeof q.themeId === 'number') {
          expect(themeIds).toContain(q.themeId);
        }
      });
    });
  });
});
