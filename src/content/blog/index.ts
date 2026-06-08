import type { BlogPost } from './types';
import healthBenefitsSauna from './health-benefits-sauna-science-2026';
import contrastTherapy from './contrast-therapy-beginners-guide';
import saunasIreland from './saunas-ireland-complete-guide';
import seaweedBaths from './seaweed-baths-ireland';
import coldPlunge from './cold-plunge-ireland';
import saunasCork from './best-saunas-cork';
import outdoorSauna from './outdoor-sauna-ireland';
import nordicCulture from './nordic-sauna-culture-uk';
import saunasScotland from './saunas-edinburgh-glasgow';
import saunasDublin from './best-saunas-dublin';
import saunasLondon from './best-saunas-london';
import coldPlungeScienceBody2026 from './cold-plunge-science-body-2026';

export type { BlogPost };

export const ALL_POSTS: BlogPost[] = [
  coldPlungeScienceBody2026,
  healthBenefitsSauna,
  saunasLondon,
  saunasDublin,
  saunasScotland,
  nordicCulture,
  outdoorSauna,
  saunasCork,
  coldPlunge,
  seaweedBaths,
  saunasIreland,
  contrastTherapy,
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return ALL_POSTS.find(p => p.slug === slug);
}

export { coldPlungeScienceBody2026, healthBenefitsSauna, contrastTherapy, saunasIreland, seaweedBaths, coldPlunge, saunasCork, outdoorSauna, nordicCulture, saunasScotland, saunasDublin, saunasLondon };
