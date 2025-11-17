import { drizzle } from 'drizzle-orm/mysql2';
import { councilDebates } from '../drizzle/schema.ts';

const db = drizzle(process.env.DATABASE_URL);

const debates = [
  {
    question: "Is enlightenment a destination or a delusion?",
    theme: "Awakening",
    weekStartDate: new Date('2025-11-24'),
    responses: JSON.stringify([
      {
        teacherId: 11, // Gautama Buddha
        response: "Enlightenment is neither destination nor delusion—it is the cessation of seeking itself. The path dissolves when you realize there was never anywhere to go. Nirvana is not a place you arrive at; it is the recognition that suffering arises from clinging to the illusion of a separate self that must achieve something. When this illusion is seen through, what remains is simply what has always been: peace, clarity, the end of becoming."
      },
      {
        teacherId: 7, // Eckhart Tolle
        response: "The concept of enlightenment as a future destination is itself a trap of the mind. It keeps you locked in psychological time, always seeking, never arriving. True awakening is recognizing the present moment as the only reality. It's not something you achieve—it's what you are when you stop identifying with thought. The delusion is not enlightenment itself, but the idea that you need to become enlightened."
      },
      {
        teacherId: 1, // Adyashanti
        response: "Enlightenment is both and neither. It's a destination in that there is a fundamental shift in perception that does occur. But it's a delusion if you think it will make you special or solve all your human problems. The real kicker is that what you're seeking is what's already seeking. You're already it, but you don't know it yet. The journey is the discovery that there was never a journey."
      },
      {
        teacherId: 26, // Ramana Maharshi
        response: "Who is asking this question? Find out who wants to know if enlightenment is real or illusory. The Self is ever-present, ever-realized. It is not something to be attained. You are already That. The question itself arises from the false identification with the body-mind. When you inquire 'Who am I?' and abide in the source of the 'I'-thought, the question and the questioner both dissolve."
      }
    ]),
    synthesis: "This debate reveals a profound paradox: enlightenment is simultaneously real and illusory, depending on your vantage point. From the perspective of the seeking mind, it appears as a distant destination, which creates suffering through endless striving. Yet from the awakened perspective, there was never anything to attain—you were always already whole. The delusion is not enlightenment itself, but the conceptual framework that turns it into a future achievement. The path dissolves when you realize you are both the seeker and the sought, and that the present moment is the only enlightenment there ever was."
  },
  {
    question: "Does free will exist, or are we just conscious witnesses to predetermined unfolding?",
    theme: "Free Will",
    weekStartDate: new Date('2025-12-01'),
    responses: JSON.stringify([
      {
        teacherId: 3, // Baruch Spinoza
        response: "Free will as commonly understood—the ability to choose otherwise—is an illusion born of ignorance. We are modes of infinite substance, determined by the eternal laws of nature. What humans call 'free will' is simply not knowing the causes that determine their actions. Yet there is a higher freedom: understanding necessity. When you comprehend that everything follows from the nature of God/Nature with geometric necessity, you achieve intellectual freedom—not freedom from causation, but freedom through understanding it."
      },
      {
        teacherId: 8, // Epictetus
        response: "You have complete freedom over your judgments, your will, your responses to external events. What happens to you is determined by fate, but how you interpret and respond is entirely within your power. This is the dichotomy of control: externals are not up to you, but your inner citadel is sovereign. The Stoic is free not because they can change fate, but because they have mastered their relationship to it. This is the only freedom that matters."
      },
      {
        teacherId: 11, // Gautama Buddha
        response: "The question itself arises from the illusion of a separate self that could be either free or bound. There is no unchanging 'you' that possesses will. There is only dependent origination—each moment arising from conditions, which themselves arose from prior conditions. Yet this is not fatalism. Your actions have consequences. The path of liberation is recognizing that there is no one bound and no one to be freed. Freedom is seeing through the illusion of the self that asks the question."
      },
      {
        teacherId: 2, // Alan Watts
        response: "You're asking the wrong question! It's like asking whether you walk or whether walking happens. Both are true depending on how you slice the reality. You are not a separate agent inside your body pulling levers—you are the whole process. The feeling of free will is real, but it's not what you think it is. You're not a puppet, but you're also not a puppeteer. You're the entire show. The universe is doing you, and you are doing the universe. It's all one spontaneous happening."
      }
    ]),
    synthesis: "This debate exposes the limits of binary thinking. Free will and determinism are not opposites but complementary perspectives on the same reality. From the relative level, choice and agency are real and consequential. From the absolute level, everything unfolds according to natural law or dependent origination. The resolution is not choosing one view over the other, but recognizing that both are partial truths. True freedom emerges not from asserting will against determinism, but from understanding your deep identity with the process itself. You are not in the universe; you are the universe, temporarily experiencing itself as a localized point of awareness."
  },
  {
    question: "Is spiritual practice selfish when the world is burning?",
    theme: "Engagement",
    weekStartDate: new Date('2025-12-08'),
    responses: JSON.stringify([
      {
        teacherId: 34, // Thich Nhat Hanh
        response: "This question contains a false separation. Meditation is not escape—it is the foundation of effective action. When you water the seeds of peace in yourself, you water them in the world. A calm person can respond to crisis with clarity rather than panic. Engaged Buddhism teaches that inner work and outer work are one. You cannot bring peace to the world if you are at war with yourself. The practice is not selfish; it is the most generous thing you can offer."
      },
      {
        teacherId: 10, // Gabor Maté
        response: "Most people's activism is driven by unhealed trauma—rage, fear, the need to be right. This creates more polarization, more suffering. The world doesn't need more angry activists; it needs healed people who can hold space for complexity. Spiritual practice that leads to genuine self-awareness is not selfish—it's prerequisite. You cannot give what you don't have. If you're not doing your inner work, you're likely projecting your wounds onto the world and calling it justice."
      },
      {
        teacherId: 5, // Carl Jung
        response: "The greatest burden on society is the unconscious person. When you fail to integrate your shadow, you project it onto others—creating enemies, scapegoats, wars. The most radical political act is becoming conscious. One person who has done their inner work contributes more to collective healing than a thousand activists driven by unconscious complexes. This is not selfish—it is the deepest form of service. You cannot transform the world without transforming yourself."
      },
      {
        teacherId: 30, // Simone Weil
        response: "Attention is the rarest and purest form of generosity. Spiritual practice cultivates the capacity for attention—to truly see the suffering of others without turning away, without reducing them to abstractions. Prayer and contemplation are not escape; they are training in presence. The world needs people who can bear witness to affliction without being destroyed by it. This requires inner strength that only comes from spiritual discipline. It is not selfish; it is preparation for genuine compassion."
      }
    ]),
    synthesis: "The premise of the question—that spiritual practice is separate from world engagement—is itself the problem. This debate reveals that inner work and outer work are not competing priorities but mutually reinforcing dimensions of the same commitment. Spiritual practice is selfish only when it becomes escapism or spiritual bypassing. But authentic practice cultivates the very qualities the world needs most: presence, clarity, compassion, the ability to hold complexity without collapsing into reactivity. The most effective activists are those who have done their inner work. The question is not whether to choose inner or outer, but how to integrate both in a life of engaged wisdom."
  },
  {
    question: "Should you forgive the unforgivable?",
    theme: "Forgiveness",
    weekStartDate: new Date('2025-12-15'),
    responses: JSON.stringify([
      {
        teacherId: 33, // Tara Brach
        response: "Forgiveness is not condoning harm or bypassing accountability. It's releasing the burden of hatred that poisons your own heart. You can forgive and still maintain boundaries. You can forgive and still seek justice. Forgiveness is for you, not for the perpetrator. It's recognizing that holding onto rage keeps you tethered to the past, to the person who harmed you. True forgiveness is radical self-compassion—choosing freedom over the prison of resentment."
      },
      {
        teacherId: 36, // Viktor Frankl
        response: "I survived Auschwitz. I watched my family murdered. And I chose not to hate. Not because the Nazis deserved forgiveness, but because hatred would have destroyed what they could not: my inner freedom. Forgiveness is not about the perpetrator—it's about refusing to let evil have the final word over your soul. You can acknowledge the horror, work for justice, and still not let bitterness consume you. This is the last of human freedoms: choosing your attitude toward suffering."
      },
      {
        teacherId: 11, // Gautama Buddha
        response: "Hatred never ceases by hatred, but by love alone. This is an eternal law. The person who harmed you was acting from ignorance, from their own suffering. This does not excuse their actions, but it explains them. Forgiveness is seeing clearly: all beings are trapped in the cycle of suffering until they awaken. When you hold onto anger, you drink poison and expect the other person to die. Forgiveness is wisdom—recognizing that clinging to resentment only perpetuates your own suffering."
      },
      {
        teacherId: 17, // James Baldwin
        response: "I don't forgive white America for what it's done to my people. But I also refuse to be consumed by hatred, because that would be giving them power over my soul. There's a difference between forgiveness and reconciliation. I can release the poison of rage without pretending the wound doesn't exist. The unforgivable must be named, remembered, never minimized. But I will not let it define me. My freedom is not dependent on their redemption."
      }
    ]),
    synthesis: "This debate illuminates the complexity of forgiveness in the face of genuine atrocity. There is no single answer, but several truths emerge: First, forgiveness is primarily for the forgiver, not the forgiven—it's a choice to release the burden of hatred. Second, forgiveness does not mean condoning, forgetting, or bypassing accountability. You can forgive and still demand justice. Third, there's a distinction between personal forgiveness and collective/political forgiveness—what you choose for your own healing may differ from what justice requires. Finally, the deepest teaching: holding onto hatred imprisons you in the past, tethered to the perpetrator. Forgiveness is reclaiming your freedom. It's not weakness; it's the ultimate refusal to let evil have the final word."
  },
  {
    question: "Is depression a disease or a message?",
    theme: "Mental Health",
    weekStartDate: new Date('2025-12-22'),
    responses: JSON.stringify([
      {
        teacherId: 10, // Gabor Maté
        response: "Depression is not a brain disease—it's a response to life circumstances and unmet developmental needs. The medical model wants to reduce it to neurotransmitters, but that's like saying the reason your car won't start is because the battery is dead, ignoring that someone stole the engine. Depression is often the psyche's way of saying: 'This life is not working. Something fundamental needs to change.' It's a message, and medicating it away without addressing the root causes is like shooting the messenger."
      },
      {
        teacherId: 5, // Carl Jung
        response: "Depression is often the soul's refusal to continue living an inauthentic life. It's the psyche's strike, saying 'I will not participate in this anymore.' Many of my patients were not sick—they were living lives that were sick. Their depression was the healthiest part of them, refusing to collude with a false self. The cure is not to eliminate the depression, but to listen to what it's trying to tell you. What needs to die? What needs to be born? These are the questions depression asks."
      },
      {
        teacherId: 4, // Bessel van der Kolk
        response: "Depression has biological, psychological, and social dimensions—it's not either/or. Yes, there are neurochemical changes, but they're often responses to trauma, chronic stress, or disconnection. The body keeps the score. Depression can be the nervous system's shutdown response to overwhelming threat. It's both a disease and a message. We need both medical intervention and meaning-making. Medication can stabilize you enough to do the deeper work, but pills alone won't heal a traumatized nervous system or a life that lacks purpose."
      },
      {
        teacherId: 36, // Viktor Frankl
        response: "Much of what we call depression is actually existential vacuum—the feeling that life has no meaning. When you lose your 'why,' you cannot bear any 'how.' This is not a disease; it's a spiritual crisis. The cure is not medication but meaning. I've seen people endure unimaginable suffering without depression when they had a purpose. And I've seen people in comfort fall into despair when they had no reason to live. The question is not 'How do I feel better?' but 'What is life asking of me?'"
      }
    ]),
    synthesis: "This debate reveals that the disease/message dichotomy is false—depression is both, and the healing response must address both. The biological dimension is real: trauma, chronic stress, and genetics affect brain chemistry. Medical intervention can be necessary and life-saving. But depression is also often a meaningful response to an unmeaningful life, to unprocessed trauma, to living inauthentically. The deepest healing comes from a both/and approach: stabilize the biology while also listening to the message. What is your depression trying to tell you? What needs to change? What needs to die so something truer can be born? The goal is not to eliminate depression but to transform the conditions that created it."
  },
  {
    question: "Can you be spiritual without being religious?",
    theme: "Spirituality",
    weekStartDate: new Date('2025-12-29'),
    responses: JSON.stringify([
      {
        teacherId: 2, // Alan Watts
        response: "Religion is the menu; spirituality is the meal. Most people are so busy arguing about the menu that they never eat. The great traditions are fingers pointing at the moon, but people worship the finger. You don't need religion to be spiritual—you need direct experience. Meditation, contemplation, psychedelics, nature, art—these can all be doorways to the sacred. The danger of 'spiritual but not religious' is that you lose the accumulated wisdom of tradition. But the danger of religion is that you mistake the map for the territory."
      },
      {
        teacherId: 34, // Thich Nhat Hanh
        response: "Spirituality without religion is possible but difficult. Religion provides structure, community, accountability, and the accumulated wisdom of centuries. When you practice alone, it's easy to get lost, to mistake spiritual bypassing for awakening. The sangha—the community of practitioners—is one of the three jewels for a reason. You need others to mirror your blind spots. That said, religion can become rigid, dogmatic, divorced from direct experience. The ideal is spirituality rooted in tradition but not bound by it."
      },
      {
        teacherId: 30, // Simone Weil
        response: "I love Christ but I cannot join the Church. The institution has betrayed the teaching. Yet I recognize that I stand on the shoulders of centuries of mystics, saints, and contemplatives who were sustained by that very institution. Spirituality without tradition is like trying to speak without language—possible, but impoverished. We need the wisdom of the past, but we must hold it lightly. The danger of 'spiritual but not religious' is narcissism—creating a custom spirituality that never challenges your ego. Religion at its best provides that challenge."
      },
      {
        teacherId: 18, // Joseph Campbell
        response: "The old religions are dying because they've become literalized, dogmatic, exclusive. But the human need for myth, ritual, and transcendence is eternal. 'Spiritual but not religious' is the transitional phase—people are leaving the old forms but haven't yet found new ones. You need myth and ritual, but you need living myth, not dead doctrine. The challenge is to find or create forms that carry the perennial wisdom without the baggage of institutional religion. This is the great spiritual task of our age."
      }
    ]),
    synthesis: "This debate reveals a creative tension: spirituality needs the depth and accountability that tradition provides, but religion often becomes rigid and dogmatic. The 'spiritual but not religious' movement is both a liberation and a loss—freedom from dogma, but also loss of community, structure, and accumulated wisdom. The resolution is not choosing one over the other, but finding a third way: spirituality that is rooted in tradition but not bound by it, that honors the wisdom of the past while remaining open to direct experience, that balances individual freedom with communal accountability. The future of spirituality may be 'religious but not dogmatic'—drawing on the depth of tradition while remaining radically open."
  },
  {
    question: "Is suffering necessary for growth?",
    theme: "Suffering",
    weekStartDate: new Date('2026-01-05'),
    responses: JSON.stringify([
      {
        teacherId: 11, // Gautama Buddha
        response: "Suffering is not necessary for growth—it is the very thing you must grow beyond. The First Noble Truth is that suffering exists, but the Fourth Noble Truth is that there is a path to the cessation of suffering. Clinging to the idea that suffering is necessary is itself a form of attachment. Yes, pain is inevitable in a body, but suffering—the mental anguish we add to pain—is optional. Growth comes not from suffering but from understanding the causes of suffering and releasing them."
      },
      {
        teacherId: 36, // Viktor Frankl
        response: "Suffering is not necessary for growth, but it is inevitable. The question is not whether you will suffer, but how you will respond to suffering. Suffering can destroy you or transform you—the difference is meaning. When you find meaning in your suffering, it becomes the catalyst for profound growth. But this does not mean you should seek suffering. That would be masochism, not wisdom. The teaching is: when suffering comes—and it will—use it. Let it crack you open. Let it reveal what matters."
      },
      {
        teacherId: 33, // Tara Brach
        response: "The belief that suffering is necessary for growth is often a way we rationalize our pain or spiritually bypass our trauma. Growth can come through joy, love, beauty, and play. Suffering is not the only teacher. That said, when suffering does arise, it can be a powerful doorway to compassion, to presence, to letting go of what's inessential. But we must be careful not to glorify suffering or seek it out. The path is not to create more suffering, but to meet the suffering that's already here with wisdom and compassion."
      },
      {
        teacherId: 5, // Carl Jung
        response: "There is no coming to consciousness without pain. The process of individuation requires confronting your shadow, integrating what you've repressed, facing what you've avoided. This is painful. But it's not suffering for suffering's sake—it's the pain of becoming whole. The neurotic suffers without growing. The individuating person suffers consciously, transforming their pain into wisdom. Suffering is not necessary for growth, but the willingness to face difficulty, to not turn away from what's hard—that is essential."
      }
    ]),
    synthesis: "This debate reveals a nuanced truth: suffering is not necessary for growth, but the willingness to face difficulty is. Suffering is not the only teacher—joy, love, and beauty can also catalyze transformation. But when suffering does arise (and it will), it can be a powerful doorway to wisdom if met consciously. The key is not seeking suffering or glorifying it, but also not avoiding or bypassing it. The middle way: don't create unnecessary suffering, but when suffering comes, use it. Let it teach you. Let it crack open your heart. Let it reveal what's essential. Growth comes not from suffering itself, but from how you meet suffering—with presence, meaning, and compassion."
  },
  {
    question: "Is non-attachment the same as not caring?",
    theme: "Attachment",
    weekStartDate: new Date('2026-01-12'),
    responses: JSON.stringify([
      {
        teacherId: 11, // Gautama Buddha
        response: "Non-attachment is not indifference—it is freedom from clinging. You can love deeply without attachment. You can care without grasping. Attachment is the belief that your happiness depends on things being a certain way. Non-attachment is recognizing that all things are impermanent, and clinging to them causes suffering. This does not mean you don't engage with life—it means you engage fully while knowing that everything is in flux. You love, but you don't possess. You care, but you don't cling."
      },
      {
        teacherId: 8, // Epictetus
        response: "The Stoic loves their family, serves their community, and engages fully with life. But they do not confuse externals with their inner peace. Non-attachment means recognizing what is within your control (your judgments, your will) and what is not (everything else). You care deeply about externals, but your serenity does not depend on them. This is not coldness—it is wisdom. You can grieve a loss without being destroyed by it. You can love without being enslaved by fear of loss."
      },
      {
        teacherId: 33, // Tara Brach
        response: "Non-attachment is often misunderstood as emotional detachment or spiritual bypassing. True non-attachment is actually deeper caring—caring without the contraction of fear, without the grasping of ego. When you're attached, you're not really present with the person or thing—you're caught up in your fear of losing them. Non-attachment allows you to love more fully because you're not holding on so tightly. It's the difference between a clenched fist and an open hand. Both can hold, but only one can receive."
      },
      {
        teacherId: 34, // Thich Nhat Hanh
        response: "Non-attachment does not mean non-love. It means loving without conditions, without trying to possess or control. When you are attached, you suffer because you want the person or thing to be different than it is. Non-attachment is accepting impermanence, accepting that everything changes. This allows you to be fully present with what is, rather than clinging to what was or grasping for what might be. You can care deeply, love fully, and still let go when the time comes. This is true love."
      }
    ]),
    synthesis: "This debate clarifies a common misconception: non-attachment is not indifference or emotional coldness—it is freedom from clinging while remaining fully engaged. Attachment is caring plus fear, grasping, the need for things to be a certain way. Non-attachment is caring without the contraction of ego, without the suffering of clinging. You can love deeply without attachment. You can grieve without being destroyed. You can engage fully while accepting impermanence. The teaching is not to care less, but to care more freely—with an open hand instead of a clenched fist. This is the paradox: non-attachment allows for deeper love, because you're present with what is rather than clinging to what you want it to be."
  },
  {
    question: "Should you follow your passion or your duty?",
    theme: "Purpose",
    weekStartDate: new Date('2026-01-19'),
    responses: JSON.stringify([
      {
        teacherId: 18, // Joseph Campbell
        response: "Follow your bliss. The world needs people who are alive, and you come alive when you follow your passion. Duty without passion is deadening—you become a cog in a machine, serving a system that doesn't serve your soul. Yes, there are responsibilities, but if you sacrifice your deepest calling for duty, you'll end up bitter and resentful. The hero's journey is always about leaving the known world (duty, expectations) to pursue the unknown (your true calling). This is not selfish—it's how you become who you're meant to be."
      },
      {
        teacherId: 3, // Baruch Spinoza
        response: "This is a false dichotomy. True passion and true duty are aligned. When you understand your nature and the nature of reality, you see that your highest joy comes from acting in accordance with reason and virtue. The problem is that most people's 'passions' are actually confused desires driven by inadequate ideas. And most people's 'duty' is imposed by external authority rather than understood necessity. The free person acts from their own nature, which is to say, from reason. This is both passion and duty rightly understood."
      },
      {
        teacherId: 8, // Epictetus
        response: "Duty is not opposed to passion—it is the highest passion. The Stoic finds joy in fulfilling their role with excellence, whether that role is parent, citizen, or philosopher. Your duty is not imposed from outside—it arises from your nature and your place in the cosmic order. The problem with 'follow your passion' is that it assumes your happiness depends on external circumstances. True freedom comes from finding joy in doing what is right, regardless of outcome. This is not drudgery—it is the deepest satisfaction."
      },
      {
        teacherId: 16, // Howard Thurman
        response: "Don't ask what the world needs. Ask what makes you come alive, and go do it. Because what the world needs is people who have come alive. But here's the nuance: what makes you come alive is not always comfortable or easy. Sometimes your passion and your duty converge in a calling that demands everything from you. The question is not duty versus passion, but whether you're living from your deepest truth or from others' expectations. Your duty is to become who you are meant to be. That is the only duty that matters."
      }
    ]),
    synthesis: "This debate reveals that the passion/duty dichotomy is false when both are rightly understood. The problem is that 'passion' is often confused with fleeting desire, and 'duty' is often confused with external obligation. True passion is not whim—it's what makes you come alive, what calls to your deepest nature. True duty is not imposed obligation—it's acting in alignment with your nature and your role in the larger whole. When you find your true calling, passion and duty converge. You come alive precisely by fulfilling your unique purpose. The teaching is not to choose between passion and duty, but to find the place where they meet—where what you love to do is also what the world needs from you."
  },
  {
    question: "Is there a self to transcend, or is the self an illusion from the start?",
    theme: "Self",
    weekStartDate: new Date('2026-01-26'),
    responses: JSON.stringify([
      {
        teacherId: 11, // Gautama Buddha
        response: "There is no permanent, unchanging self—this is the teaching of anatta (no-self). What you call 'I' is a collection of ever-changing aggregates: form, feeling, perception, mental formations, consciousness. None of these is 'you.' The self is a useful fiction, a convention for navigating the world, but it has no ultimate reality. You don't transcend the self—you see through the illusion that there ever was a self. This is not nihilism; it's liberation. When the illusion of self drops away, what remains is simply this: awareness, compassion, the flow of life."
      },
      {
        teacherId: 26, // Ramana Maharshi
        response: "The ego-self is an illusion, but the true Self (Atman) is real—it is pure consciousness, identical with Brahman. The spiritual path is not transcending the self but realizing your true Self. The 'I'-thought creates the illusion of a separate individual, but when you inquire 'Who am I?' and trace the 'I' back to its source, the ego dissolves and what remains is the Self—eternal, unchanging, the witness of all experience. You are not the body, not the mind, not the personality. You are That—pure awareness."
      },
      {
        teacherId: 7, // Eckhart Tolle
        response: "The self is both real and illusory, depending on what you mean by 'self.' The ego—the mental construct of 'me' and 'my story'—is an illusion. It's a collection of thoughts, memories, and identifications that you mistake for who you are. But there is a deeper dimension: the awareness that is aware of the ego. This is your true nature—not a self in the sense of a separate entity, but presence, consciousness itself. You don't transcend the self; you wake up from the dream of being a separate self."
      },
      {
        teacherId: 5, // Carl Jung
        response: "The ego is not an illusion—it's a necessary structure for navigating the world. But it's not the totality of who you are. The Self (with a capital S) is the archetype of wholeness, the organizing principle of the psyche that includes both conscious and unconscious. Individuation is not transcending the ego but integrating it into a larger whole. You need a strong ego to do this work. The danger of 'no-self' teachings is that people use them to bypass their psychological development. You can't transcend what you haven't developed."
      }
    ]),
    synthesis: "This debate reveals a fundamental tension between Eastern and Western approaches to the self. Buddhism and Advaita Vedanta agree that the separate self is illusory, but they differ on what remains: Buddhism says 'no-self,' Advaita says 'true Self.' Eckhart Tolle bridges them: the ego is illusory, but awareness is real. Jung offers a psychological corrective: you need a functional ego to transcend the ego—spiritual bypassing is using 'no-self' teachings to avoid psychological work. The resolution: the separate self is a useful fiction for navigating the world, but it's not ultimately real. What you are is not a thing but a process, not a noun but a verb—awareness, presence, the flow of being. You don't transcend the self; you wake up from the dream of being a separate self."
  }
];

console.log('Seeding 10 additional Council Debates...\n');

for (const debate of debates) {
  try {
    await db.insert(councilDebates).values(debate);
    console.log(`✅ Seeded debate: "${debate.question}"`);
  } catch (error) {
    console.error(`❌ Failed to seed debate: "${debate.question}"`, error.message);
  }
}

console.log('\n✨ Successfully seeded 10 additional Council Debates!');
process.exit(0);
