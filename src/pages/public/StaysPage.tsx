import { useEffect, useRef, useState } from "react";
import TabsComponent from "@/components/tabs/TabsComponent";
import ImageSlider, { type SliderItem } from "@/components/sliders/ImageSlider";
import ImageCardCollection from "@/components/collections/ImageCardCollection";
import { useAppDispatch } from "@/store/hooks";
import { getTestStart } from "@/store/auth/authSlice";

type Category = "Πόλη" | "Παραλία" | "Φύση" | "Χαλάρωση";

const categorySliderItems: Record<Category, SliderItem[]> = {
  Πόλη: [
    {
      title: "Πόλη 1",
      img: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Πόλη 2",
      img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Πόλη 3",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Πόλη 4",
      img: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Πόλη 5",
      img: "https://images.unsplash.com/photo-1520962922320-2038eebab146?auto=format&fit=crop&w=1400&q=80",
    },
  ],
  Παραλία: [
    {
      title: "Παραλία 1",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Παραλία 2",
      img: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Παραλία 3",
      img: "https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Παραλία 4",
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Παραλία 5",
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    },
  ],
  Φύση: [
    {
      title: "Φύση 1",
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Φύση 2",
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Φύση 3",
      img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Φύση 4",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Φύση 5",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    },
  ],
  Χαλάρωση: [
    {
      title: "Χαλάρωση 1",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Χαλάρωση 2",
      img: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Χαλάρωση 3",
      img: "https://images.unsplash.com/photo-1519821172141-b5d8a4b9c8ac?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Χαλάρωση 4",
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Χαλάρωση 5",
      img: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80",
    },
  ],
};


const exploreGreeceItems = [
  {
    title: "Athens",
    description: "13,262 properties",
    img: "https://images.unsplash.com/photo-1555992336-cbfdbb8aaf23?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Thessaloniki",
    description: "3,761 properties",
    img: "https://images.unsplash.com/photo-1601992516920-3f4e4a0d2972?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Ioannina",
    description: "709 properties",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Nafplio",
    description: "717 properties",
    img: "https://images.unsplash.com/photo-1549640376-1be9a80b4b5d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Chania",
    description: "2,295 properties",
    img: "https://images.unsplash.com/photo-1566999749595-07186b3e2e1e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Kalamata",
    description: "1,032 properties",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Patras",
    description: "177 properties",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Syros",
    description: "122 properties",
    img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
];

function computeStepPx(container: HTMLDivElement | null, fallback: number) {
  if (!container) return fallback;
  const first = container.querySelector<HTMLElement>('[data-slide-item="true"]');
  if (!first) return fallback;

  const styles = window.getComputedStyle(container);
  // flex gap comes from "gap-4" = 16px typically; parse it safely:
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "16") || 16;

  return first.offsetWidth + gap;
}

function canScrollRight(container: HTMLDivElement | null) {
  if (!container) return false;
  return container.scrollLeft + container.clientWidth < container.scrollWidth - 2;
}

const StaysPage = () => {
  const dispatch = useAppDispatch();

  const [activeCategory, setActiveCategory] = useState<Category>("Πόλη");

  // Slider 1: Explore Greece
  const exploreRef = useRef<HTMLDivElement | null>(null);
  const [exploreCanRight, setExploreCanRight] = useState(false);

  // Slider 2: Category images
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const [categoryCanRight, setCategoryCanRight] = useState(false);

  // Explore slider listeners
  useEffect(() => {
    const el = exploreRef.current;
    if (!el) return;

    const update = () => setExploreCanRight(canScrollRight(el));
    update();

    const onScroll = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Category slider listeners (re-run when category changes)
  useEffect(() => {
    const el = categoryRef.current;
    if (!el) return;

    // reset position when switching tabs
    el.scrollLeft = 0;

    const update = () => setCategoryCanRight(canScrollRight(el));
    update();

    const onScroll = () => update();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [activeCategory]);

  const scrollExploreOneRight = () => {
    const el = exploreRef.current;
    if (!el) return;
    const step = computeStepPx(el, 264);
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  const scrollCategoryOneRight = () => {
    const el = categoryRef.current;
    if (!el) return;
    const step = computeStepPx(el, 340);
    el.scrollBy({ left: step, behavior: "smooth" });
  };

  const topCollectionCards = [
    {
      title: "Athens",
      flag: "🇬🇷",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Athenss",
      flag: "🇬🇷",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Thessaloniki",
      flag: "🇬🇷",
      img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  const botomCollectionCards = [
            {
              title: "Rome",
              flag: "🇮🇹",
              img: "https://images.unsplash.com/photo-1525874684015-58379d421a52?auto=format&fit=crop&w=1400&q=80",
            },
            {
              title: "Ioannina",
              flag: "🇬🇷",
              img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
            },
            {
              title: "London",
              flag: "🇬🇧",
              img: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
            },
          ];

  return (
    <>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      {/* HERO */}
      <section className="bg-[#003580] text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 onClick={() => dispatch(getTestStart())} className="text-4xl font-bold mb-2">
            Βρείτε το επόμενο κατάλυμά σας
          </h2>
          <p className="text-lg mb-8">
            Κάντε αναζήτηση για προσφορές σε ξενοδοχεία, σπίτια και πολλά άλλα
          </p>
        </div>
      </section>

      {/* TRENDING DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <h3 className="text-2xl font-bold">Trending destinations</h3>
        <p className="text-muted-foreground mt-1">
          Most popular choices for travelers from Greece
        </p>
        <ImageCardCollection
          topCards={topCollectionCards}
          botomCards={botomCollectionCards}
        />
      </section>

      {/* EXPLORE GREECE (HORIZONTAL SLIDER) */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <h3 className="text-2xl font-bold">Explore Greece</h3>
        <p className="text-muted-foreground mt-1">
          These popular destinations have a lot to offer
        </p>
        <ImageSlider
          sliderRef={exploreRef}
          sliderItems={exploreGreeceItems}
          sliderCanRight={exploreCanRight}
          scrollSliderOneRight={scrollExploreOneRight}
        />
      </section>

      {/* CATEGORY TABS + SLIDER */}
      <section className="max-w-7xl mx-auto px-4 mt-12">
        <h3 className="text-2xl font-bold mb-2">Σχεδιάστε ταξίδια γρήγορα και εύκολα</h3>
        <p className="text-muted-foreground mb-6">Διαλέξτε τύπο ταξιδιού</p>

        <TabsComponent<Category>
          tabListStyle="bg-transparent p-0 flex flex-wrap gap-3 mb-6"
          tabTriggers={(Object.keys(categorySliderItems) as Category[]).map((cat) => {
            return {
              style: "px-4 py-2 rounded-full border data-[state=active]:bg-blue-50 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 border-gray-300",
              value: cat,
              name: cat,
            }
          })}
          onValueChange={(v) => setActiveCategory(v as Category)}
          activeTab={activeCategory}
        />

        {/* IMAGE ROW (SLIDER) */}
        <ImageSlider
          sliderRef={categoryRef}
          sliderItems={categorySliderItems[activeCategory]}
          sliderCanRight={categoryCanRight}
          scrollSliderOneRight={scrollCategoryOneRight}
        />
      </section>

    </>
  );
};

export default StaysPage;
