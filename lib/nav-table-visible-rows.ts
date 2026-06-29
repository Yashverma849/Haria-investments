export const NAV_TABLE_XL_MEDIA = "(min-width: 1280px)";
export const NAV_TABLE_DEFAULT_VISIBLE_ROWS = 5;
export const NAV_TABLE_MIN_VISIBLE_ROWS = 3;
export const NAV_TABLE_READ_MORE_RESERVE_PX = 48;
export const NAV_TABLE_BORDER_PX = 4;

export type NavTableVisibleRowInput = {
  notesHeight: number;
  headerHeight: number;
  rowHeights: number[];
  readMoreReserve?: number;
  tableBorderPx?: number;
  minRows?: number;
};

/**
 * Returns how many NAV table rows should be visible so the table body
 * (plus optional read-more reserve) aligns with the Good to know panel height.
 */
export function getNavTableVisibleRowCount({
  notesHeight,
  headerHeight,
  rowHeights,
  readMoreReserve = NAV_TABLE_READ_MORE_RESERVE_PX,
  tableBorderPx = NAV_TABLE_BORDER_PX,
  minRows = NAV_TABLE_MIN_VISIBLE_ROWS,
}: NavTableVisibleRowInput): number {
  const totalRows = rowHeights.length;
  if (totalRows === 0) return minRows;

  const targetBodyHeight = notesHeight - headerHeight - tableBorderPx;
  if (targetBodyHeight <= 0) return minRows;

  let bestCount = Math.min(minRows, totalRows);

  for (let count = minRows; count <= totalRows; count++) {
    const bodyHeight = rowHeights
      .slice(0, count)
      .reduce((sum, height) => sum + height, 0);
    const needsReadMore = count < totalRows;
    const totalHeight = bodyHeight + (needsReadMore ? readMoreReserve : 0);

    if (totalHeight <= targetBodyHeight) {
      bestCount = count;
      continue;
    }

    break;
  }

  return bestCount;
}
