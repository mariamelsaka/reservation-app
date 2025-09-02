import Button from "@components/Ui/Button";

interface Zone {
  id: string;
  name: string;
  categoryId: string;
  totalSlots: number;
  occupied: number;
  open: boolean;
  rateNormal: number;
  rateSpecial: number;
}

interface ZoneCardProps {
  zone: Zone;
  onCheckin: (zoneId: string) => void;
}

const ZoneCard = ({ zone, onCheckin }: ZoneCardProps) => {
  return (
    <div className="bg-white p-4 rounded shadow flex flex-col">
      <h3 className="text-lg font-semibold">{zone.name}</h3>
      <p>Category: {zone.categoryId}</p>
      <p>
        Slots: {zone.occupied}/{zone.totalSlots} {zone.open ? "(Open)" : "(Closed)"}
      </p>
      <p>
        Rate: ${zone.rateNormal} / ${zone.rateSpecial} special
      </p>
      <Button
        onClick={() => onCheckin(zone.id)}
        disabled={!zone.open || zone.occupied >= zone.totalSlots}
        className="mt-2"
      >
        Check In
      </Button>
    </div>
  );
};

export default ZoneCard;
