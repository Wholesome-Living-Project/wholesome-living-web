import { COLORS } from "@/theme/theme";
import { Button, Dialog, Flex } from "@radix-ui/themes";
import { PropsWithChildren, ReactNode, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

type Props = {
  title: string;
  description: string;
  content: ReactNode;
  primaryButtonLabel?: string;
  secondaryButtonLabel?: string;
  onPrimaryButtonClick?: () => Promise<void>;
  onSecondaryButtonClick?: () => void;
  loading?: boolean;
} & PropsWithChildren;
const Modal = ({
  content,
  title,
  description,
  onSecondaryButtonClick,
  secondaryButtonLabel,
  primaryButtonLabel,
  onPrimaryButtonClick,
  loading,
  children,
}: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={() => setOpen(!open)}>
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
            <Button
              onClick={async () => {
                await onPrimaryButtonClick?.()
                  .then(() => setOpen(false))
                  .catch(() => {});
              }}
            >
              {loading ? (
                <ThreeDots color={COLORS.WHITE} width={30} />
              ) : (
                primaryButtonLabel
              )}
            </Button>
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default Modal;
