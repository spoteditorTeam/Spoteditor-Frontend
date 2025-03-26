import { useEffect, useState } from 'react';
import { useBlocker } from 'react-router-dom';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type CompareFn<T> = (current: T) => boolean;

export default function useUnsavedChangesWarning<T extends FieldValues>(
  form: UseFormReturn<T>,
  isChanged: CompareFn<T>
) {
  const [proceedNavigation, setProceedNavigation] = useState(false);

  // 1. 새로고침 또는 브라우저 닫기 경고
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isChanged(form.getValues())) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [form, isChanged]);

  // 2. 페이지 이동 경고
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    if (
      isChanged(form.getValues()) &&
      currentLocation.pathname !== nextLocation.pathname &&
      !proceedNavigation
    ) {
      const confirmLeave = window.confirm('저장하지 않고 나가시겠습니까?');
      if (confirmLeave) {
        setProceedNavigation(true);
        return false;
      }
      return true;
    }
    return false;
  });

  // 3. 유저가 확인 누르면 진행
  useEffect(() => {
    if (blocker.state === 'blocked' && proceedNavigation) {
      blocker.proceed();
    }
  }, [blocker, proceedNavigation]);
}

/* import { useProfileNavigationStore } from '@/store/profileStore';
import { useEffect } from 'react';

export function useBlocker(blocker: (tx: any) => void, when = true) {
  const navigator = useProfileNavigationStore((state) => state.navigator);

  useEffect(() => {
    if (!when || !navigator) return;

    // unblock을 미리 선언하여 콜백 내부에서 참조 가능하도록 한다.
    let unblock: () => void;

    const blockHandler = (tx: any) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          // unblock을 호출해서 블록 해제 후 retry 실행
          if (unblock) {
            unblock();
          }
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    };

    unblock = navigator.block(blockHandler);

    return () => {
      if (unblock) {
        unblock();
      }
    };
  }, [navigator, blocker, when]);
}

export function usePrompt(message: string, when = true) {
  useBlocker((tx: any) => {
    if (window.confirm(message)) {
      tx.retry();
    }
    // 취소 시 아무 동작 없이 현재 페이지에 머문다.
  }, when);
}

export default function useUnsavedChangesWarning(isDirty: boolean) {
  // 새로고침이나 브라우저 창 닫기 시 경고 처리
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirty) return;
      e.preventDefault();
      e.returnValue = ''; // 대부분 브라우저에서 경고창을 띄움
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // 라우터 내 페이지 이동 시 경고 처리
  usePrompt('저장하지 않고 나가시겠습니까?', isDirty);
}
 */
