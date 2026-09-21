import { TutorialItem } from '../types';

export const TUTORIALS: TutorialItem[] = [
  {
    id: 'comment-creer-une-video-avec-ia-revid-heygen',
    title: 'Comment créer une vidéo avec l\'IA : Le guide complet (Revid AI & HeyGen)',
    slug: 'comment-creer-une-video-avec-ia-revid-heygen',
    excerpt: 'Apprenez à produire une vidéo professionnelle de bout en bout sans caméra : script automatique, avatar IA ou montage B-roll dynamique, voix off réaliste et sous-titres synchronisés.',
    category: 'Vidéo & Animation',
    difficulty: 'Débutant',
    readingTime: '8 min de lecture',
    readTime: '8 min de lecture',
    lastUpdated: '18 septembre 2024',
    publishedAt: '10 septembre 2024',
    author: {
      name: 'Thomas Laurent',
      role: 'Consultant Vidéo & IA Générative',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
    },
    toolsUsed: ['Revid AI', 'HeyGen', 'ElevenLabs'],
    overview: 'La création vidéo traditionnelle exige du matériel coûteux, des compétences complexes de montage et des heures de tournage. Aujourd\'hui, en combinant des outils spécialisés comme Revid AI (pour les formats courts réseaux sociaux) et HeyGen (pour les présentations incarnées par avatar), vous pouvez générer une vidéo prête à diffuser en moins de 15 minutes.',
    prerequisites: [
      'Un compte gratuit sur Revid AI ou HeyGen',
      'Une idée de sujet ou un article de blog à recycler',
      'Aucune compétence préalable en montage vidéo requise'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Définir l\'objectif et choisir le format (Court vs Présentation)',
        description: 'Avant de générer le moindre visuel, identifiez le canal de diffusion. Pour TikTok, Instagram Reels ou YouTube Shorts, privilégiez le format vertical (9:16) avec un rythme soutenu via Revid AI. Pour un tutoriel de formation interne ou un message commercial B2B, privilégiez le format horizontal (16:9) avec avatar HeyGen.',
        tip: 'Sur les formats courts, les 3 premières secondes (le "hook") déterminent 80% du taux de rétention de votre audience.'
      },
      {
        stepNumber: 2,
        title: 'Générer le script optimisé avec un prompt structuré',
        description: 'Utilisez un grand modèle de langage pour rédiger un script percutant. Structurez-le en trois temps : Accroche intrigante, Développement factuel en 3 points clés, et Appel à l\'action (CTA) limpide.',
        codeLanguage: 'markdown',
        codeSnippet: `Rédige un script de vidéo courte (60 secondes) sur le sujet suivant : [SUJET].
Ton : Dynamique, direct, sans introduction formelle.
Structure :
- 0 à 3s : Accroche percutante qui pose un problème immédiat.
- 4 à 45s : 3 conseils actionnables sans jargon.
- 46 à 60s : Conclusion percutante et question d'engagement pour les commentaires.`
      },
      {
        stepNumber: 3,
        title: 'Production dans Revid AI (pour les vidéos courtes dynamiques)',
        description: 'Collez votre script dans Revid AI. Sélectionnez une voix off en français à intonation naturelle. Activez la génération de sous-titres animés avec mise en valeur colorée mot par mot. Laissez l\'IA sélectionner les plans d\'illustration (B-roll) ou insérez vos propres captures.',
        tip: 'Vérifiez toujours la prononciation des acronymes techniques (ex: prononcez "R-A-G" ou écrivez-le phonétiquement si la voix hésite).'
      },
      {
        stepNumber: 4,
        title: 'Alternative HeyGen (pour les vidéos avec présentateur virtuel)',
        description: 'Si vous avez besoin d\'un présentateur face caméra, rendez-vous dans HeyGen. Choisissez un avatar professionnel adapté à votre secteur. Collez votre texte, prévisualisez l\'intonation et lancez le rendu avec synchronisation labiale automatique.',
        tip: 'Vous pouvez créer un "Instant Avatar" de vous-même en téléchargeant simplement 2 minutes de vidéo tournée avec votre smartphone.'
      },
      {
        stepNumber: 5,
        title: 'Export, vérification et publication',
        description: 'Téléchargez la vidéo en résolution 1080p. Vérifiez l\'orthographe des sous-titres générés, le niveau sonore de la musique de fond par rapport à la voix, et publiez directement sur vos canaux.'
      }
    ],
    takeaways: [
      'Revid AI est idéal pour produire 10 à 30 vidéos courtes par mois sans compétences techniques.',
      'HeyGen s\'impose pour les vidéos institutionnelles, la formation et le support client multilingue.',
      'L\'accroche des 3 premières secondes reste l\'élément déterminant du succès d\'une vidéo IA.'
    ],
    // Semantic relationships
    relatedTools: ['revid-ai', 'heygen', 'runway-gen3', 'elevenlabs'],
    relatedPrompts: ['prompt-script-video-court-tiktok-reels'],
    relatedComparisons: ['revid-ai-vs-heygen-quelle-ia-video-choisir'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    faq: [
      {
        question: 'Combien de temps faut-il pour créer une vidéo avec Revid AI ?',
        answer: 'Entre 5 et 10 minutes à partir d\'un script existant. La génération automatique des sous-titres et le montage B-roll prennent environ 90 secondes sur les serveurs cloud.'
      },
      {
        question: 'Les vidéos générées par IA sont-elles monétisables sur YouTube et TikTok ?',
        answer: 'Oui, à condition que le contenu apporte une réelle valeur ajoutée (information, éducation, analyse originale) et ne soit pas un simple copier-coller automatisé de texte sans substance.'
      }
    ]
  },
  {
    id: 'creer-un-moteur-rag-souverain-avec-mistral',
    title: 'Créer un moteur RAG souverain avec Mistral AI et LangChain',
    slug: 'creer-un-moteur-rag-souverain-avec-mistral',
    excerpt: 'Guide technique pour connecter vos documents internes confidentiels (PDF, Notion) à Mistral Large sans fuite de données vers l\'étranger.',
    category: 'Productivité',
    difficulty: 'Intermédiaire',
    readingTime: '12 min de lecture',
    readTime: '12 min de lecture',
    lastUpdated: '15 septembre 2024',
    publishedAt: '08 septembre 2024',
    author: {
      name: 'Alexandre Renard',
      role: 'Architecte Solutions Cloud & IA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    toolsUsed: ['Mistral AI', 'LangChain', 'ChromaDB'],
    overview: 'L\'architecture RAG (Retrieval-Augmented Generation) est la solution de référence pour permettre à une IA de répondre précisément sur vos données métiers sans risque d\'hallucination. En combinant l\'API européenne de Mistral AI avec une base vectorielle hébergée sur vos serveurs, vous garantissez une conformité RGPD totale.',
    prerequisites: [
      'Une clé d\'API Mistral AI (console.mistral.ai)',
      'Environnement Python 3.10+ installé',
      'Notions de base de manipulation de fichiers'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Installation des bibliothèques nécessaires',
        description: 'Installez les paquets officiels Mistral, LangChain et la base vectorielle ChromaDB dans un environnement virtuel dédié.',
        codeLanguage: 'bash',
        codeSnippet: `pip install langchain langchain-mistralai chromadb pypdf python-dotenv`
      },
      {
        stepNumber: 2,
        title: 'Chargement et découpage (chunking) des documents',
        description: 'Pour que l\'IA puisse retrouver les passages pertinents, vos documents doivent être découpés en fragments de taille homogène avec un léger chevauchement.',
        codeLanguage: 'python',
        codeSnippet: `from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

loader = PyPDFLoader("politique_interne_2024.pdf")
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=150)
splits = text_splitter.split_documents(docs)`
      },
      {
        stepNumber: 3,
        title: 'Génération des embeddings et indexation vectorielle',
        description: 'Utilisez le modèle mistral-embed pour vectoriser chaque fragment et l\'enregistrer dans votre base de données locale.',
        codeLanguage: 'python',
        codeSnippet: `from langchain_mistralai import MistralAIEmbeddings
from langchain_community.vectorstores import Chroma

embeddings = MistralAIEmbeddings(model="mistral-embed")
vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)`
      },
      {
        stepNumber: 4,
        title: 'Création de la chaîne de réponse avec Mistral Large 2',
        description: 'Connectez le retriever à Mistral Large 2 avec une consigne stricte de citation des sources pour éliminer les approximations.',
        codeLanguage: 'python',
        codeSnippet: `from langchain_mistralai import ChatMistralAI
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate

llm = ChatMistralAI(model="mistral-large-latest", temperature=0.1)

system_prompt = (
    "Tu es un assistant documentaire rigoureux. Réponds uniquement à partir du contexte fourni. "
    "Si l'information n'est pas présente, réponds 'Information non disponible dans les documents'.\\n\\n"
    "{context}"
)
prompt = ChatPromptTemplate.from_messages([("system", system_prompt), ("human", "{input}")])
question_answer_chain = create_stuff_documents_chain(llm, prompt)
rag_chain = create_retrieval_chain(vectorstore.as_retriever(), question_answer_chain)

response = rag_chain.invoke({"input": "Quel est le délai de préavis pour les cadres ?"})
print(response["answer"])`
      }
    ],
    takeaways: [
      'Le découpage des documents (chunking) conditionne 70% de la pertinence des réponses en RAG.',
      'Le modèle mistral-embed offre un rapport coût/qualité remarquable pour les textes en français.',
      'L\'hébergement local de la base vectorielle élimine tout risque de fuite de données d\'entreprise.'
    ],
    relatedTools: ['mistral-le-chat', 'claude-3-5-sonnet', 'cursor-editor'],
    relatedPrompts: ['prompt-synthese-analytique-documents-complexes'],
    relatedComparisons: ['mistral-large-2-vs-claude-3-5-sonnet'],
    relatedArticles: ['souverainete-ia-europe-bataille-modeles-2024'],
    faq: [
      {
        question: 'Pourquoi préférer Mistral AI à OpenAI pour un système RAG en France ?',
        answer: 'Pour deux raisons majeures : la conformité réglementaire (hébergement et juridiction européenne) et la précision linguistique supérieure de Mistral sur les textes administratifs, juridiques et techniques rédigés en français.'
      }
    ]
  },
  {
    id: 'creer-des-visuels-photorealistes-avec-midjourney-et-flux',
    title: 'Créer des visuels photoréalistes avec Midjourney v6 et Flux.1',
    slug: 'creer-des-visuels-photorealistes-avec-midjourney-et-flux',
    excerpt: 'Maîtrisez la syntaxe avancée des prompts visuels : éclairage cinématique, gestion des focales d\'appareils photo, rendu de textures et intégration de texte typographique.',
    category: 'Image & Design',
    difficulty: 'Débutant',
    readingTime: '7 min de lecture',
    readTime: '7 min de lecture',
    lastUpdated: '14 septembre 2024',
    publishedAt: '05 septembre 2024',
    author: {
      name: 'Camille Mercier',
      role: 'Directrice Artistique Digitale',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    toolsUsed: ['Midjourney v6', 'Flux.1'],
    overview: 'Le rendu photoréaliste ne dépend pas du hasard. Il s\'appuie sur la maîtrise du vocabulaire de la photographie (optiques, éclairages, pellicules) et sur la compréhension des mécanismes propres à Midjourney v6 et Flux.1.',
    prerequisites: [
      'Un abonnement Midjourney actif ou un accès à Flux.1',
      'Notions de base de cadrage photographique'
    ],
    steps: [
      {
        stepNumber: 1,
        title: 'Bannir les mots-clés superflus',
        description: 'Évitez les termes creux comme "photorealistic", "hyperrealistic", "4K" ou "masterpiece" qui polluent l\'espace d\'attention du modèle. Décrivez plutôt les éléments physiques réels de la scène.',
        tip: 'Décrivez précisément la source de lumière (ex: "lumière rasante du matin", "néon tamisé bleu et ambre", "softbox de studio 45 degrés").'
      },
      {
        stepNumber: 2,
        title: 'Spécifier l\'optique et le boîtier photographique',
        description: 'Pour un portrait ou un produit, mentionner une focale (ex: 85mm f/1.4) indique au modèle la profondeur de champ et le flou d\'arrière-plan (bokeh) souhaités.',
        codeLanguage: 'text',
        codeSnippet: `editorial portrait of a French architect in her Paris workshop, natural morning side lighting from large industrial windows, shot on 35mm film, Leica M6, Kodak Portra 400, natural skin texture, depth of field, authentic environment --ar 16:9 --style raw --v 6.0`
      },
      {
        stepNumber: 3,
        title: 'Exploiter la supériorité typographique de Flux.1',
        description: 'Si votre visuel doit comporter un titre ou une enseigne lisible, Flux.1 surpasse Midjourney. Placez le texte souhaité entre guillemets doubles dans votre consigne.',
        codeLanguage: 'text',
        codeSnippet: `A vintage Parisian coffee shop front in autumn, a black chalk board outside with the white text "Le Café des Amis" clearly written in elegant cursive script, rainy cobblestones, warm yellow interior glow.`
      }
    ],
    takeaways: [
      'La description de l\'éclairage et de l\'optique remplace avantageusement les qualificatifs génériques.',
      'Midjourney excelle dans la direction artistique et l\'ambiance cinématique.',
      'Flux.1 est le meilleur choix pour l\'insertion de textes précis et l\'anatomie des mains.'
    ],
    relatedTools: ['midjourney-v6', 'flux-1-schnell', 'runway-gen3'],
    relatedPrompts: ['prompt-shooting-photo-produit-minimaliste'],
    relatedComparisons: ['midjourney-v6-vs-flux-1-schnell'],
    relatedArticles: ['droit-auteur-ia-generative-tribunaux-francais'],
    faq: [
      {
        question: 'Comment éviter l\'effet "peau plastique" sur Midjourney ?',
        answer: 'Ajoutez le paramètre `--style raw` et mentionnez explicitement des caractéristiques naturelles comme `natural skin pores, unretouched photograph, subtle imperfections`.'
      }
    ]
  }
];
