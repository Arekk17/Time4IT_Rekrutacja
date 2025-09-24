import Image from "next/image";

interface PageHeaderProps {
  userName?: string;
  userEmail?: string;
  avatarSrc?: string;
}

export function PageHeader({
  userName = "Olivia Rhye",
  avatarSrc = "/assets/Avatar.png",
}: PageHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-4 w-full max-w-[1216px] h-14">
      <div className="hidden flex-row items-center w-64 h-7"></div>

      <div className="flex flex-row flex-wrap items-start content-start gap-5 w-full h-14">
        <div className="flex flex-row items-center gap-4 w-full min-w-80 h-14 flex-1">
          <div className="relative w-14 h-14 rounded-full border border-black/8 overflow-hidden flex-shrink-0">
            <Image
              src={avatarSrc}
              alt={`Avatar użytkownika ${userName}`}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-start flex-1 h-[54px]">
            <div className="w-full h-[30px] font-semibold text-xl leading-[30px] text-foreground">
              Witaj ponownie, Olivia
            </div>

            <div className="w-full h-6 font-normal text-base leading-6 text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </div>

        <div className="hidden flex-row items-center gap-3 w-[419px] h-10"></div>
      </div>

      <div className="hidden w-full h-px bg-border"></div>
    </div>
  );
}
