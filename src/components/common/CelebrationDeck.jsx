import { useNavigate } from 'react-router-dom';
import SmartImage from '@/components/common/SmartImage';
import ShuffleDeck from '@/components/common/ShuffleDeck';
import { celebrationThemes } from '@/data/banquet';

export default function CelebrationDeck() {
  const navigate = useNavigate();
  return (
    <ShuffleDeck
      cards={celebrationThemes}
      label="Next idea"
      className="h-[500px] w-[min(88vw,360px)]"
      onTopClick={(c) => navigate(`/banquets?event=${encodeURIComponent(c.event)}#enquiry`)}
      renderCard={(c) => (
        <div className="flex h-full flex-col">
          <SmartImage src={c.image} alt={`${c.title} styling idea (illustrative photograph)`} className="h-[64%] w-full object-cover" draggable={false} />
          <div className="flex flex-1 flex-col justify-center px-6">
            <h3 className="font-serif text-3xl leading-tight">{c.title}</h3>
            <p className="mt-2 text-sm text-coffee/80">{c.mood}</p>
            <p className="mt-3 text-[0.6rem] uppercase tracking-[0.25em] text-caramel">Tap to plan this celebration</p>
          </div>
        </div>
      )}
    />
  );
}
