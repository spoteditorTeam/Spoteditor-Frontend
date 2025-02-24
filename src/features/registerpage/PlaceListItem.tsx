import { Button } from '@/components/ui/button';
import { useRegisterStore } from '@/store/registerStore';
import { useId } from 'react';

const PlaceListItem = () => {
  const addSearchPlace = useRegisterStore((state) => state.addSearchPlace);
  const handleAddClick = (place) => addSearchPlace(place);
  const id = useId();

  return (
    <div className="flex justify-between py-1 items-center">
      <div className="text-text-sm font-medium">
        <h5>장소명</h5>
        <p className="text-primary-300">관광명소 · 포항 · 안동</p>
      </div>
      <Button
        variant={'ghost'}
        size={'s'}
        fullRounded
        onClick={() => handleAddClick(`새로운 장소 ${id}`)}
      >
        선택
      </Button>
    </div>
  );
};

export default PlaceListItem;
