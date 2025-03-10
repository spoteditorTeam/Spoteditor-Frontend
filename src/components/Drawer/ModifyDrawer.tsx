import { DialogDescription } from '@radix-ui/react-dialog';
import { ArrowDown, ArrowUp, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { Drawer } from 'vaul';
import { Button } from '../ui/button';
import { DrawerTitle } from '../ui/drawer';

interface ModifyDrawerProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  modifyTarget: kakao.maps.services.PlacesSearchResultItem | null;
}

const ModifyDrawer = ({ isOpen, modifyTarget }: ModifyDrawerProps) => {
  if (!modifyTarget) return null;
  const handleUpClick = () => console.log(modifyTarget, '위로');
  const handleDownClick = () => console.log(modifyTarget, '아래로');
  const handleDeleteClick = () => console.log(modifyTarget, '삭제');
  return (
    <Drawer.Root open={isOpen}>
      <Drawer.Portal>
        <Drawer.Content
          data-testid="content"
          className="z-50 fixed flex flex-col bg-black border border-gray-200 border-b-none rounded-t-[10px] bottom-0 left-0 right-0 h-20"
        >
          <DrawerTitle className="hidden">로그 작성 내 장소 순서 변경 및 삭제 Drawer</DrawerTitle>
          <DialogDescription className="hidden">
            로그 작성 내 장소 순서 변경 및 삭제
          </DialogDescription>

          <div className="grid grid-cols-3">
            <Button onClick={handleUpClick}>
              <ArrowUp />
              위로
            </Button>
            <Button onClick={handleDownClick}>
              <ArrowDown />
              아래로
            </Button>
            <Button onClick={handleDeleteClick}>
              <Trash />
              삭제하기
            </Button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default ModifyDrawer;
