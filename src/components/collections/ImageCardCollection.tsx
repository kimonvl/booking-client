import { Card, CardContent } from "../ui/card";

export interface CardProps {
    title: string;
    img: string;
    flag?: string;
}

interface ImageCardCollectionProps {
    topCards?: CardProps[];
    botomCards?: CardProps[];
}

export default function ImageCardCollection({topCards, botomCards}: ImageCardCollectionProps) {
    console.log(topCards);
    
  return (
    <div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          { topCards && topCards.length > 0 && topCards.map((card) => (
            <Card key={card.title} className="overflow-hidden border-0 shadow-none">
              <CardContent className="p-0">
                <div
                  className="relative h-56 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${card.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-white text-2xl font-bold">{card.title}</span>
                    <span className="text-2xl text-white">{card.flag}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {botomCards && botomCards.length > 0 && botomCards.map((card) => (
            <Card key={card.title} className="overflow-hidden border-0 shadow-none">
              <CardContent className="p-0">
                <div
                  className="relative h-52 rounded-xl overflow-hidden"
                  style={{
                    backgroundImage: `url(${card.img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/10" />
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="text-white text-2xl font-bold">{card.title}</span>
                    <span className="text-2xl text-white">{card.flag}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
    </div>
  )
}
