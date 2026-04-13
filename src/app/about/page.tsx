import type { Metadata } from 'next';
import Header from '@/components/Header';

export const metadata: Metadata = {
  title: 'About Thermae — Europe\'s Sauna & Wellness Directory',
  description: 'Learn about Thermae — Europe\'s dedicated directory of saunas, cold plunges and seaweed baths across the UK, Ireland and Nordics. Our mission, the health benefits, and how to get in touch.',
};

const CORAL = '#FF5A5F';
const DARK  = '#222222';
const GREY  = '#555555';

function Section({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '64px' }}>
      {children}
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-serif, Georgia, serif)',
      fontSize: 'clamp(22px, 3vw, 32px)',
      fontWeight: 600,
      color: DARK,
      marginBottom: '20px',
      lineHeight: 1.2,
    }}>
      {children}
    </h2>
  );
}

function P({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontSize: '16px',
      lineHeight: 1.75,
      color: GREY,
      marginBottom: '18px',
      maxWidth: '700px',
      ...style,
    }}>
      {children}
    </p>
  );
}

function BenefitCard({ emoji, title, points }: { emoji: string; title: string; points: string[] }) {
  return (
    <div style={{
      background: '#FAFAFA',
      border: '1px solid #EBEBEB',
      borderRadius: '16px',
      padding: '28px 32px',
    }}>
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{emoji}</div>
      <h3 style={{
        fontFamily: 'var(--font-serif, Georgia, serif)',
        fontSize: '18px',
        fontWeight: 600,
        color: DARK,
        marginBottom: '14px',
      }}>
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {points.map((p, i) => (
          <li key={i} style={{
            fontSize: '14px',
            color: GREY,
            lineHeight: 1.6,
            paddingBottom: '8px',
            borderBottom: i < points.length - 1 ? '1px solid #EBEBEB' : 'none',
            marginBottom: i < points.length - 1 ? '8px' : 0,
          }}>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth: '860px', margin: '0 auto', padding: '64px 24px 100px' }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ fontSize: '48px', marginBottom: '24px' }}>♨️</div>
          <h1 style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 700,
            color: DARK,
            lineHeight: 1.15,
            marginBottom: '20px',
            letterSpacing: '-0.5px',
          }}>
            About Thermae
          </h1>
          <p style={{
            fontFamily: 'var(--font-serif, Georgia, serif)',
            fontSize: 'clamp(16px, 2vw, 20px)',
            fontStyle: 'italic',
            color: CORAL,
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Europe&apos;s dedicated directory of saunas, cold plunges and seaweed baths
          </p>
        </div>

        {/* ── SECTION 1: What is Thermae? ── */}
        <Section>
          <H2>What is Thermae?</H2>
          <P>
            Thermae comes from the Latin word for public thermal baths. The Romans built them everywhere —
            in every city they settled, from Bath to Beirut — as centres of community, health and social life.
            The thermae weren&apos;t just places to get clean. They were where you met your neighbours, struck deals,
            debated philosophy, and simply exhaled at the end of a long day.
          </P>
          <P>
            We named our directory Thermae because that spirit of communal warmth, wellness and connection is
            exactly what saunas, cold plunges and seaweed baths represent today. The names have changed. The
            cultures are different. But the impulse — to gather around heat, to sweat together, to plunge into
            cold water and feel genuinely alive — that hasn&apos;t changed at all.
          </P>
        </Section>

        {/* ── SECTION 2: Mission ── */}
        <Section>
          <H2>Our Mission</H2>
          <P>
            Thermae is Europe&apos;s dedicated directory of saunas, cold plunges, seaweed baths and contrast therapy
            venues. We believe everyone deserves access to the transformative benefits of heat and cold therapy —
            not just those who know where to look.
          </P>
          <P>
            We cover the UK, Ireland and Nordics — from community wood-fired saunas on Irish beaches to iconic
            Nordic bathhouses in Helsinki and Reykjavik. We list every type of venue: the tiny barrel sauna
            tucked behind a Donegal headland, the grand Art Deco baths in East London, the rooftop Finnish
            sauna with views across the city. If heat and cold therapy is on offer, we want to list it.
          </P>
          <P>
            Every listing on Thermae includes real information: prices, opening hours, what to expect, how to
            get there, and whether you&apos;ll need your own towel. We check our data regularly and we&apos;re always
            adding new venues. If we&apos;ve missed one, <a href="/submit" style={{ color: CORAL, textDecoration: 'none', fontWeight: 600 }}>tell us</a>.
          </P>
        </Section>

        {/* ── SECTION 3: Health Benefits ── */}
        <Section>
          <H2>The Health Benefits</H2>
          <P style={{ marginBottom: '32px' }}>
            The science behind sauna and cold therapy has never been stronger. Here&apos;s what the research says
            about each type of experience available on Thermae.
          </P>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            <BenefitCard
              emoji="🔥"
              title="Sauna"
              points={[
                'Cardiovascular health — Finnish research shows regular sauna use reduces cardiovascular disease risk by up to 63% (Laukkanen et al., 2018)',
                'Stress relief — cortisol drops significantly after a 20-minute session',
                'Muscle recovery — heat shock proteins accelerate repair of damaged muscle tissue',
                'Skin health — opens pores, flushes out toxins, improves circulation to skin',
                'Immune system — elevated core temperature mimics a fever, activating immune response',
                'Sleep quality — the body temperature drop after sauna triggers deeper sleep',
              ]}
            />
            <BenefitCard
              emoji="🧊"
              title="Cold Plunge"
              points={[
                'Reduces inflammation — cold constricts blood vessels, reducing swelling and tissue damage',
                'Boosts dopamine by up to 300% — sustained for hours after immersion (Srámek et al.)',
                'Norepinephrine increase — by up to 300%, improving mood, focus and energy',
                'Improves circulation — the vasodilation after cold shock drives fresh blood to tissues',
                'Mental resilience — repeatedly choosing discomfort trains the stress response system',
                'Faster muscle recovery — reduces DOMS (delayed onset muscle soreness) significantly',
              ]}
            />
            <BenefitCard
              emoji="🌿"
              title="Seaweed Baths"
              points={[
                'Rich in iodine, magnesium, calcium, potassium and over 60 trace minerals',
                'Deeply soothing for skin conditions like eczema, psoriasis and rosacea',
                'The natural alginate the seaweed releases softens and nourishes the skin',
                'Deep muscle relaxation — magnesium absorbed through the skin eases tension',
                'Ancient Irish tradition going back centuries — thalassotherapy at its purest',
                'Warming and detoxifying — the combination of seaweed and hot seawater is profound',
              ]}
            />
            <BenefitCard
              emoji="♾️"
              title="Contrast Therapy"
              points={[
                'The combination of heat and cold is greater than the sum of each alone',
                'Dramatically improves circulation — alternating vasodilation and vasoconstriction',
                'Reduces muscle soreness significantly — beyond what either treatment achieves alone',
                'Boosts mood and energy levels — the dopamine and endorphin response is significant',
                'Promotes cardiovascular adaptations — repeated practice strengthens the heart and vessels',
                'Mental clarity and resilience — regular practice builds extraordinary stress tolerance',
              ]}
            />
          </div>
        </Section>

        {/* ── SECTION 4: The Sauna Boom ── */}
        <Section>
          <H2>The Sauna Boom</H2>
          <P>
            Something has shifted. A decade ago, finding a real sauna in most British or Irish cities was nearly
            impossible — the only options were tired hotel spa rooms with electric heaters set too low. Today,
            the landscape is almost unrecognisable.
          </P>
          <P>
            Part of it is Wim Hof. The Dutch athlete turned breathwork and cold exposure into a global movement,
            showing millions of people that deliberate cold was not punishment but transformation. Part of it is
            Dr Andrew Huberman, whose Stanford neuroscience podcast broke down the dopamine and norepinephrine
            effects of cold water with such clarity that ice baths became almost compulsory for anyone interested
            in performance or mental health.
          </P>
          <P>
            But the deeper driver is something older: the pandemic. Two years of isolation made people desperate
            for genuine communal experience. The sauna offered exactly that — a place where phones were left
            outside, where you sat close to strangers in comfortable silence, where the shared experience of heat
            created an effortless sense of connection. Community sauna movements emerged in London, Dublin, and
            across coastal Ireland, not despite the discomfort but because of it.
          </P>
          <P>
            In 2026, the UK and Ireland have some of the finest sauna culture in the world. Not because we have
            ancient traditions to draw on — though Ireland&apos;s seaweed bath history goes back centuries — but
            because we&apos;ve embraced it entirely on our own terms. The barrel saunas on Irish beaches, the rooftop
            Finnish saunas in East London, the community-run contrast therapy venues in Hackney and Peckham —
            these feel genuinely ours now. We wouldn&apos;t have them any other way.
          </P>
        </Section>

        {/* ── SECTION 5: For Venue Owners ── */}
        <Section>
          <div style={{
            background: '#FFF8F8',
            border: '1px solid #FFD6D7',
            borderRadius: '20px',
            padding: '40px',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '16px' }}>🏠</div>
            <H2>For Venue Owners</H2>
            <P>
              Do you run a sauna, cold plunge, seaweed bath or contrast therapy venue? We&apos;d love to feature you.
            </P>
            <P>
              You can <a href="/submit" style={{ color: CORAL, textDecoration: 'none', fontWeight: 600 }}>suggest your venue</a> for
              free listing, or claim an existing listing to keep your details up to date. Featured listings are
              available from <strong>£49 per month</strong> — these appear at the top of search results, include
              expanded descriptions, and are highlighted across our directory.
            </P>
            <P style={{ marginBottom: '24px' }}>
              Email us at <a href="mailto:hello@thermae.app" style={{ color: CORAL, textDecoration: 'none', fontWeight: 600 }}>hello@thermae.app</a> to
              claim your listing or discuss featured placement.
            </P>
            <a
              href="/submit"
              style={{
                display: 'inline-block',
                background: CORAL,
                color: '#fff',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: 700,
                padding: '12px 28px',
                borderRadius: '999px',
                textDecoration: 'none',
                letterSpacing: '0.2px',
              }}
            >
              Submit Your Venue 🌿
            </a>
          </div>
        </Section>

        {/* ── SECTION 6: Get in Touch ── */}
        <Section>
          <H2>Get in Touch</H2>
          <P>
            We love hearing from sauna enthusiasts, venue owners, wellness writers and anyone who has a venue
            we might have missed. Thermae is a labour of love, and every email is read and replied to.
          </P>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '28px' }}>
            <a
              href="mailto:hello@thermae.app"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '16px',
                color: DARK,
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <span style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#FFF0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}>
                ✉️
              </span>
              <div>
                <div style={{ fontWeight: 600, color: DARK }}>Email</div>
                <div style={{ fontSize: '14px', color: CORAL }}>hello@thermae.app</div>
              </div>
            </a>
            <a
              href="https://instagram.com/thermae"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                fontSize: '16px',
                color: DARK,
                textDecoration: 'none',
                fontWeight: 500,
              }}
            >
              <span style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: '#FFF0F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                flexShrink: 0,
              }}>
                📷
              </span>
              <div>
                <div style={{ fontWeight: 600, color: DARK }}>Instagram</div>
                <div style={{ fontSize: '14px', color: CORAL }}>@thermae</div>
              </div>
            </a>
          </div>
        </Section>

      </main>
    </>
  );
}
