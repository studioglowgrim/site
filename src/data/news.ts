export interface NewsItem {
  id: number;
  tag: { en: string; ko: string };
  title: { en: string; ko: string };
  desc: { en: string; ko: string };
  image: string;
  link: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    tag: { en: 'FAR EAST FILM FESTIVAL', ko: '극동영화제' },
    title: { en: '<The Sent: A PASTOR, A MURDERER>', ko: '<사도: 목사, 그리고 가해자>' },
    desc: {
      en: 'Screening to be held at the Udine Far East Film Festival. April 29, 2026 / Cinema Visionario Sala Ferroviario',
      ko: '우디네 극동영화제 공식 상영 일정 확정. 2026년 4월 29일 / 시네마 비전',
    },
    image: '/images/banners/the-sent-banner.jpg',
    link: '#',
  },
  {
    id: 2,
    tag: { en: 'NEW RELEASE', ko: '신규 공개' },
    title: { en: 'And Then There Were Fungi', ko: '그리고 곰팡이가 있었다' },
    desc: {
      en: 'Medical factual series premiering on global streaming platforms this fall. A deep dive into the hidden world.',
      ko: '올가을 글로벌 스트리밍 플랫폼을 통해 메디컬 팩추얼 시리즈가 공개될 예정입니다. 숨겨진 세계로의 탐구.',
    },
    image: '/images/banners/fungi-banner.png',
    link: '#',
  },
  {
    id: 3,
    tag: { en: 'PRODUCTION', ko: '제작 현황' },
    title: { en: 'Monster Space: Season 1 Wrap', ko: '몬스터 스페이스: 시즌 1 크랭크업' },
    desc: {
      en: 'Filming concluded across 6 countries. Post-production begins next month to explore neuroarchitecture.',
      ko: '6개국 촬영이 완료되었습니다. 신경건축학 탐구를 위한 포스트 프로덕션이 다음 달 시작됩니다.',
    },
    image: '/images/banners/monster-space-banner.png',
    link: '#',
  },
];
