export interface Project {
  id: number;
  slug: string;
  title: { en: string; ko: string };
  subtitle: { en: string; ko: string };
  meta: { en: string; ko: string };
  headcopy: { en: string; ko: string };
  desc: { en: string; ko: string };
  posterImage: string;
  bannerImage: string;
  trailerUrl?: string;
  posterPosition?: string;
}

export const projectsData: Project[] = [
  {
    id: 1,
    slug: 'the-sent',
    title: { en: 'THE SENT', ko: 'THE SENT' },
    subtitle: { en: 'A Pastor, A Perpetrator', ko: '목사, 그리고 가해자' },
    meta: { en: 'Documentary / 90 min / UHD', ko: '다큐멘터리 / 90분 / UHD' },
    headcopy: {
      en: 'A Final Confession Long Buried in Silence',
      ko: '긴 침묵 속에 묻혀 있던 마지막 고백',
    },
    desc: {
      en: "Forty years after living as a devoted clergyman, Jung-geun reveals that he was once a perpetrator in the massacre of civilians during the Vietnam War. Before his memories fade and the truth is lost, he decides to confront the past and make a confession he has carried for a lifetime. This documentary follows the final journey of a man who has lived as a soldier, a murderer, and a pastor, as he struggles to face victims, former comrades, and the truth he can no longer hide.",
      ko: "헌신적 성직자로 살아온 지 40년, 정근은 자신이 베트남전 민간인 학살의 가해자였음을 밝힌다. 기억이 사라지기 전에, 그는 과거와 마주하고 평생 안고 온 고백을 결심하기로 한다. 이 다큐멘터리는 군인, 그리고 목사로 살아온 한 사람이 피해자들, 전우들, 그리고 더 이상 숨길 수 없는 진실과 마주하는 마지막 여정을 따라간다.",
    },
    posterImage: '/images/posters/the-sent.png',
    bannerImage: '/images/banners/the-sent-banner.jpg',
    trailerUrl: 'https://youtu.be/CHqywKMME0A',
  },
  {
    id: 2,
    slug: 'fungi',
    title: { en: 'And Then There Were Fungi', ko: 'And Then There Were Fungi' },
    subtitle: { en: '', ko: '' },
    meta: { en: 'Factual Series / 3 x 60 min / UHD', ko: '팩추얼 시리즈 / 3 x 60분 / UHD' },
    headcopy: {
      en: 'WHO has identified fungi as an emerging threat to human health',
      ko: 'WHO는 곰팡이를 인류 건강을 위협하는 새로운 위험으로 지정했다',
    },
    desc: {
      en: "Each year, fungal infections affect around 150 million people and cause approximately 1.7 million deaths worldwide. Their fatality rate is higher than that of COVID-19, and the threat is growing more serious. Experts warn that fungi could trigger the next pandemic, threatening not only human survival but also the balance of entire ecosystems. <And Then There Were Fungi> is a medical factual series that traces the spread of fungal diseases and investigates the growing outbreak threatening humanity.",
      ko: "매년 약 1억 5천만 명이 곰팡이 감염에 노출되며, 약 170만 명이 목숨을 잃는다. 치사율은 코로나19를 넘어서고, 위협은 점점 심각해지고 있다. 전문가들은 곰팡이가 다음 팬데믹을 촉발하여 인류뿐만 아니라 생태계 전체를 위협할 수 있다고 경고한다. <And Then There Were Fungi>는 곰팡이 질환의 확산을 추적하고 인류를 위협하는 대유행의 실체를 파헤치는 메디컬 팩추얼 시리즈.",
    },
    posterImage: '/images/posters/fungi.png',
    bannerImage: '/images/banners/fungi-banner.png',
  },
  {
    id: 3,
    slug: 'monster-space',
    title: { en: 'Monster Space', ko: '몬스터 스페이스' },
    subtitle: { en: 'Space Profiling Series', ko: '공간 프로파일링 시리즈' },
    meta: { en: 'Science Reality Series / 6 x 30 min / UHD', ko: '사이언스 리얼리티 / 6 x 30분 / UHD' },
    headcopy: {
      en: 'Some spaces are not simply strange. They unsettle the mind.',
      ko: '어떤 공간은 단순히 이상한 것을 넘어서, 마음을 불안하게 만든다.',
    },
    desc: {
      en: "This series explores ominous, oppressive, and psychologically disturbing spaces across the world, asking how architecture can shape emotion, stress, and perception. Through field experiments, expert analysis, and immersive investigation, it reveals the hidden power of space over the human mind. Monster Space is a factual reality series where travel, science, mystery, and neuroarchitecture collide.",
      ko: "이 시리즈는 전 세계의 불길하고 압도적이며 심리적으로 불안한 공간을 탐구하며, 건축이 어떻게 감정, 스트레스, 그리고 인식에 영향을 미치는지 묻는다. 현장 실험, 전문가 분석, 그리고 몰입감 있는 조사를 통해 인간의 마음에 대한 공간의 숨겨진 힘을 밝힌다. <몬스터 스페이스>는 여행, 과학, 미스터리, 그리고 신경건축학이 충돌하는 팩추얼 리얼리티 시리즈.",
    },
    posterImage: '/images/posters/monster-space.jpg',
    bannerImage: '/images/banners/monster-space-banner.png',
    trailerUrl: 'https://youtu.be/7XNDvlWdc68',
    posterPosition: 'bottom',
  },
  {
    id: 4,
    slug: 'didigo-expedition',
    title: { en: 'Didigo Expedition', ko: '디디고 원정대' },
    subtitle: { en: '', ko: '' },
    meta: { en: 'Travel Reality Series / 10 x 30 min / FHD', ko: '여행 리얼리티 / 10 x 30분 / FHD' },
    headcopy: {
      en: 'Lost in Spain, Finding Their Own Way',
      ko: '낯선 땅에서 길을 잃고, 자신만의 길을 찾다',
    },
    desc: {
      en: "Four young adults with different disabilities are thrown into an unpredictable journey across Spain. They get lost, face cultural misunderstandings, and stumble into unexpected challenges, but keep moving forward with humor, courage, and growing trust in one another. Along the way, the trip becomes more than an adventure. It becomes a journey that pushes back against prejudice and opens up new ways of seeing the world. <Didigo Expedition> is a travel reality series about friendship, independence, and the unexpected freedom of finding your own way.",
      ko: "각기 다른 장애를 가진 네 명의 청년이 스페인에서의 예측 불가한 여정에 던져진다. 길을 잃고, 문화적 오해에 부딪히고, 예상치 못한 도전 속에서도 유머, 그리고 서로에 대한 커져가는 신뢰를 통해서 계속해서 앞으로 나아간다. 여정은 단순한 모험 이상이 된다. 편견에 맞서고 세상을 새로운 눈으로 볼 수 있는 여정이다. <디디고 원정대>는 우정, 자립, 그리고 자신만의 길을 찾는 예상치 못한 자유에 대한 여행 리얼리티 시리즈.",
    },
    posterImage: '/images/posters/didigo-expedition.png',
    bannerImage: '/images/banners/didigo-banner.png',
    posterPosition: 'bottom',
  },
  {
    id: 5,
    slug: 'betrayal-of-space',
    title: { en: "Betrayal of Space : Murderer's Room", ko: '공간의 배신 : 살인자의 방' },
    subtitle: { en: '', ko: '' },
    meta: { en: 'Documentary / 50 min / FHD', ko: '다큐멘터리 / 50분 / FHD' },
    headcopy: {
      en: 'Can Space Breed a Monster?',
      ko: '공간이 괴물을 만들 수 있을까?',
    },
    desc: {
      en: 'Azuma Shinichiro, a 14-year-old serial killer who shocked Japan. Architect Akito Yokoyama points to a "dangerous house structure" as the environment that turned him into a monster. Could there truly be common spatial flaws in the homes of brutal criminals? <Betrayal of Space: Murderer\'s Room> follows this provocative hypothesis through the lens of neuroarchitecture, a field that studies how space affects human emotion, cognition, and stress responses.',
      ko: "일본을 충격에 빠뜨린 14세 연쇄 살인범 아즈마 신이치로. 건축가 요코야마 아키토는 그를 괴물로 만든 환경으로 '위험한 집 구조'를 지목한다. 정말로 흉악 범죄자들의 집에는 공통적인 공간 결함이 있을까? <공간의 배신: 살인자의 방>은 공간이 인간의 감정, 인지, 스트레스 반응에 어떤 영향을 미치는지 연구하는 신경건축학의 렌즈를 통해 이 도발적인 가설을 따라간다.",
    },
    posterImage: '/images/posters/betrayal-of-space.png',
    bannerImage: '/images/posters/betrayal-of-space.png',
    trailerUrl: 'https://youtu.be/0m0oPzTTNsc',
  },
  {
    id: 6,
    slug: 'moms-pedal',
    title: { en: "MOM'S PEDAL", ko: '엄마의 페달' },
    subtitle: { en: '', ko: '' },
    meta: { en: 'Road Documentary / 2 X 50 min / FHD', ko: '로드 다큐멘터리 / 2 x 50분 / FHD' },
    headcopy: {
      en: "A Mother's Pedal, A Child's First Way Forward",
      ko: '엄마의 페달, 아이의 첫 걸음 앞으로',
    },
    desc: {
      en: "Young autistic adults in their mid-twenties, and mothers in their fifties who ride beside them. Having long lived at a distance from the world, they begin to move toward it for the first time through cycling. With every turn of the wheel, the children gain confidence, while their mothers discover how precious it is to share this journey together. After completing a bicycle trek around Jeju Island through falls, setbacks, and perseverance, they set out on a greater challenge ahead. From Queenstown on New Zealand's South Island, they begin a ten-day cycling journey through vast natural landscapes.",
      ko: "20대 중반의 자폐 청년들과 그들 옆에서 함께 달리는 50대 엄마들. 오랫동안 세상과 거리를 두고 살아온 이들이 자전거를 통해 처음으로 세상을 향해 움직이기 시작한다. 바퀴가 돌 때마다 아이들은 자신감을 얻고, 엄마들은 함께하는 여정이 얼마나 소중한지를 깨닫는다. 넘어짐과 좌절, 그리고 인내 끝에 제주도를 완주한 이들은 더 큰 도전에 나선다. 뉴질랜드 남섬 퀸스타운에서 시작하여 광활한 자연 속 10일간의 자전거 여정이 시작된다.",
    },
    posterImage: '/images/posters/moms-pedal.png',
    bannerImage: '/images/banners/moms-pedal-banner.png',
  },
];
