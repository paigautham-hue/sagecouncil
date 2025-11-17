import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is not set");
  process.exit(1);
}

const connection = await mysql.createConnection(DATABASE_URL);
const db = drizzle(connection);

const paradoxes = [
  {
    title: "The Paradox of Effort",
    paradoxStatement: "You must work hard to achieve enlightenment, yet enlightenment is the realization that there is nothing to achieve.",
    themeId: "purpose_and_meaning",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "eckhart_tolle",
        perspective: "The spiritual journey is not about becoming something you're not, but recognizing what you already are. Effort creates the illusion of a future state to reach, which keeps you trapped in time. Yet paradoxically, without sincere engagement, the mind remains asleep."
      },
      {
        teacherId: "ramana_maharshi",
        perspective: "The Self is always realized. There is no need to realize what is already realized. But the mind must be destroyed, and this requires effort. The effort is not to gain something new, but to remove the obstacles that obscure what already is."
      }
    ])
  },
  {
    title: "The Paradox of Control",
    paradoxStatement: "You must take full responsibility for your life, yet you have no control over most of what happens.",
    themeId: "ego_and_self",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "epictetus",
        perspective: "Distinguish between what is in your control (your judgments, desires, aversions) and what is not (everything external). Take complete ownership of the former, and accept the latter with equanimity. This is the path to freedom."
      },
      {
        teacherId: "alan_watts",
        perspective: "The ego wants to be in control, but life is fundamentally uncontrollable. The paradox dissolves when you realize that 'you' and 'life' are not separate. You don't control the river by being the river."
      }
    ])
  },
  {
    title: "The Paradox of Desire",
    paradoxStatement: "Desire causes suffering, yet without desire, there is no motivation to live or grow.",
    themeId: "suffering_and_growth",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "buddha",
        perspective: "The Second Noble Truth teaches that craving (tanha) is the root of suffering. But there is a distinction between tanha (selfish craving) and chanda (wholesome desire). The desire for liberation, for wisdom, for the welfare of all beings—this is not the desire that binds."
      },
      {
        teacherId: "nisargadatta_maharaj",
        perspective: "All desires are born of the false idea 'I am the body-mind.' When you realize your true nature, desires fall away naturally, not through suppression. What remains is spontaneous action, free from the burden of personal wanting."
      }
    ])
  },
  {
    title: "The Paradox of the Self",
    paradoxStatement: "You must know yourself, yet the more you look, the less you find a 'self' to know.",
    themeId: "ego_and_self",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "ramana_maharshi",
        perspective: "The question 'Who am I?' is the direct path. When you inquire deeply, you find that the 'I'-thought has no independent existence. It arises and subsides. What remains when the 'I' is not present? That is your true Self—pure awareness."
      },
      {
        teacherId: "carl_jung",
        perspective: "The Self is both the center and the circumference of the psyche. It is the archetype of wholeness, yet it can never be fully grasped by the ego. Individuation is the lifelong process of becoming who you truly are, which paradoxically means discovering that you were never separate to begin with."
      }
    ])
  },
  {
    title: "The Paradox of Acceptance",
    paradoxStatement: "You must accept reality as it is, yet you must also work to change what is unjust or harmful.",
    themeId: "suffering_and_growth",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "viktor_frankl",
        perspective: "Between stimulus and response there is a space. In that space is our power to choose our response. Acceptance does not mean passivity—it means acknowledging reality without denial, so you can respond with wisdom rather than react from suffering."
      },
      {
        teacherId: "tara_brach",
        perspective: "Radical acceptance is the gateway to change. When you stop fighting reality, you stop wasting energy on resistance. This frees you to take wise action. Acceptance and action are not opposites—they are partners in transformation."
      }
    ])
  },
  {
    title: "The Paradox of Solitude",
    paradoxStatement: "You must be alone to find yourself, yet you can only know yourself in relationship with others.",
    themeId: "relationships",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "krishnamurti",
        perspective: "Relationship is a mirror in which you see yourself as you are. Without relationship, you cannot discover the movement of your own mind. Yet most relationships are based on mutual exploitation, not true seeing. Solitude teaches you to be alone without loneliness, which is the foundation for authentic relationship."
      },
      {
        teacherId: "thomas_merton",
        perspective: "Solitude is not the absence of others, but the presence of God. In silence, you discover your true self, which is hidden in God. This discovery makes you more present to others, not less. The contemplative and the compassionate are one."
      }
    ])
  },
  {
    title: "The Paradox of Death",
    paradoxStatement: "You must accept that you will die, yet you must live as if you will live forever.",
    themeId: "death_and_impermanence",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "marcus_aurelius",
        perspective: "Meditate often on the swiftness of time and the certainty of death. This is not morbid—it is liberating. When you remember that you will die, you stop wasting time on trivialities. You live with urgency and purpose, yet without anxiety, because you accept the natural order."
      },
      {
        teacherId: "hafez",
        perspective: "Die before you die, and discover that there is no death. The mystic knows that the soul is eternal, yet lives each moment as if it were the last. This is the secret of joy—to dance on the edge of eternity while fully present in time."
      }
    ])
  },
  {
    title: "The Paradox of Surrender",
    paradoxStatement: "You must surrender your will to a higher power, yet you must also take full responsibility for your choices.",
    themeId: "purpose_and_meaning",
    teacherPerspectives: JSON.stringify([
      {
        teacherId: "meister_eckhart",
        perspective: "Letting go is not passivity, but the highest form of action. When you surrender your personal will, you align with the divine will, which is your deepest will. This is not loss of freedom—it is the discovery of true freedom."
      },
      {
        teacherId: "spinoza",
        perspective: "Freedom is not the absence of necessity, but the understanding of necessity. When you see that all things follow from the nature of God, you cease to resist. This is amor dei intellectualis—the intellectual love of God, which is perfect freedom and perfect responsibility."
      }
    ])
  }
];

console.log(`Seeding ${paradoxes.length} paradoxes...`);

for (const paradox of paradoxes) {
  await connection.execute(
    `INSERT INTO paradoxes (title, paradoxStatement, themeId, teacherPerspectives, isActive, createdAt)
     VALUES (?, ?, ?, ?, ?, NOW())`,
    [
      paradox.title,
      paradox.paradoxStatement,
      paradox.themeId,
      paradox.teacherPerspectives,
      true
    ]
  );
  console.log(`✓ Seeded: ${paradox.title}`);
}

console.log(`\n✅ Successfully seeded ${paradoxes.length} paradoxes!`);

await connection.end();
