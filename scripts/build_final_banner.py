from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps


PROJECT = Path(__file__).resolve().parents[1]
WORKSPACE = PROJECT.parent
ARTWORK = PROJECT / "public" / "life-thread-oil-v2.png"
FOUNDATION_CI = PROJECT / "public" / "kfsp-ci.png"
FONT_BOLD = PROJECT / "public" / "fonts" / "NanumGothic-Bold.ttf"
FONT_EXTRA_BOLD = PROJECT / "public" / "fonts" / "NanumGothic-ExtraBold.ttf"

PUBLIC_OUTPUT = PROJECT / "public" / "campaign-banner-300.png"
PAGES_OUTPUT = PROJECT / "docs" / "assets" / "campaign-banner-300.png"
SUBMISSION_OUTPUT = (
    WORKSPACE
    / "outputs"
    / "생명존중_제출물"
    / "사람사이의링크_배너300_최종.png"
)

WIDTH, HEIGHT = 300, 250
NAVY = "#172641"
YELLOW = "#F4D15E"
WHITE = "#FFFDF8"
CREAM = "#F8F1E3"


def font(size: int, *, extra_bold: bool = False) -> ImageFont.FreeTypeFont:
    path = FONT_EXTRA_BOLD if extra_bold else FONT_BOLD
    return ImageFont.truetype(str(path), size=size)


def build_banner() -> Image.Image:
    artwork = Image.open(ARTWORK).convert("RGB")
    canvas = ImageOps.fit(
        artwork,
        (WIDTH, HEIGHT),
        method=Image.Resampling.LANCZOS,
        centering=(0.5, 0.48),
    ).convert("RGBA")

    # The user-supplied draft established the cream/navy/yellow art direction.
    # Recompose from the clean high-resolution artwork so the new copy remains
    # sharp at the contest's exact 300×250px size.
    wash = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    wash_draw = ImageDraw.Draw(wash)
    for x in range(WIDTH):
        alpha = max(12, 176 - int(x * 0.52))
        wash_draw.line((x, 0, x, 204), fill=(248, 241, 227, alpha))
    wash_draw.rectangle((0, 0, WIDTH, 43), fill=(248, 241, 227, 72))
    canvas = Image.alpha_composite(canvas, wash)
    draw = ImageDraw.Draw(canvas)

    label_box = (12, 10, 47, 27)
    draw.rounded_rectangle(label_box, radius=9, fill=NAVY)
    draw.text((29.5, 18.5), "광고", font=font(8), fill=WHITE, anchor="mm")

    logo = Image.open(FOUNDATION_CI).convert("RGBA")
    logo.thumbnail((108, 44), Image.Resampling.LANCZOS)
    canvas.alpha_composite(logo, (WIDTH - logo.width - 10, 5))

    draw.text((12, 42), "지나치지 않는", font=font(28, extra_bold=True), fill=NAVY)
    draw.text((12, 76), "사람,", font=font(34, extra_bold=True), fill=NAVY)
    draw.rounded_rectangle((10, 117, 153, 157), radius=5, fill=YELLOW)
    draw.text(
        (17, 116),
        "지켜줌인",
        font=font(36, extra_bold=True),
        fill=NAVY,
    )
    draw.text(
        (13, 171),
        "온라인 자살유발정보 모니터링단",
        font=font(10),
        fill=NAVY,
    )

    # Align the banner click with the landing page's single conversion goal.
    band_top = 201
    draw.rectangle((0, band_top, WIDTH, HEIGHT), fill=NAVY)
    draw.line((0, band_top, WIDTH, band_top), fill="#4A5568", width=1)

    cta_font = font(16)
    cta_x, cta_y = 16, 226
    first = "지켜줌인"
    second = " 활동 보기"
    draw.text((cta_x, cta_y), first, font=cta_font, fill=YELLOW, anchor="lm")
    first_width = draw.textlength(first, font=cta_font)
    draw.text(
        (cta_x + first_width, cta_y),
        second,
        font=cta_font,
        fill=WHITE,
        anchor="lm",
    )

    arrow_x = 282
    draw.line((arrow_x - 12, cta_y, arrow_x, cta_y), fill=WHITE, width=3)
    draw.polygon(
        ((arrow_x, cta_y), (arrow_x - 7, cta_y - 6), (arrow_x - 7, cta_y + 6)),
        fill=WHITE,
    )

    return canvas.convert("RGB")


def main() -> None:
    banner = build_banner()
    for output in (PUBLIC_OUTPUT, PAGES_OUTPUT, SUBMISSION_OUTPUT):
        output.parent.mkdir(parents=True, exist_ok=True)
        banner.save(output, format="PNG", optimize=True)
        print(output)


if __name__ == "__main__":
    main()
