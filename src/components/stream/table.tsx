import { FunctionSquareIcon, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DownloadIcon } from "lucide-react";
import { TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";

interface ActionButtonProps {
  icon?: LucideIcon;
  title?: string;
  onClick?: () => void;
  className?: string;
}

export const ActionButton = ({
  icon: Icon = FunctionSquareIcon,
  title = "Action",
  onClick,
  className,
}: ActionButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={onClick}
          className={className}
        >
          <Icon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
};

export const ExportToCsvButton = ({
  icon = DownloadIcon,
  title = "Export to CSV",
  ...rest
}: ActionButtonProps) => <ActionButton icon={icon} title={title} {...rest} />;
