import { Button, Dialog, Flex } from "@radix-ui/themes";
import { PropsWithChildren, ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  content: ReactNode;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
} & PropsWithChildren;
const Modal = ({
  content,
  title,
  description,
  onSecondaryButtonClick,
  secondaryButtonLabel,
  primaryButtonLabel,
  onPrimaryButtonClick,
  children,
}: Props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title size="6" color={"gray"}>
          {title}
        </Dialog.Title>
        <Dialog.Description color={"gray"} size="3" mb="4">
          {description}
        </Dialog.Description>
        {content}
        <Flex gap="3" mt="4" justify="end">
          {secondaryButtonLabel && (
            <Dialog.Close>
              <Button
                variant="soft"
                color="gray"
                onClick={onSecondaryButtonClick}
              >
                {secondaryButtonLabel}
              </Button>
            </Dialog.Close>
          )}
          {primaryButtonLabel && (
            <Dialog.Close onClick={onPrimaryButtonClick}>
              <Button>{primaryButtonLabel}</Button>
            </Dialog.Close>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
