"use client";

import { useLayoutEffect, useState, type RefObject } from "react";
import {
  getNavTableVisibleRowCount,
  NAV_TABLE_DEFAULT_VISIBLE_ROWS,
  NAV_TABLE_READ_MORE_RESERVE_PX,
  NAV_TABLE_XL_MEDIA,
} from "@/lib/nav-table-visible-rows";

type UseNavTableVisibleRowsOptions = {
  notesRef: RefObject<HTMLElement | null>;
  measureTableRef: RefObject<HTMLTableElement | null>;
  measureFooterRef: RefObject<HTMLElement | null>;
  visibleTableRef: RefObject<HTMLTableElement | null>;
  totalRows: number;
};

export function useNavTableVisibleRows({
  notesRef,
  measureTableRef,
  measureFooterRef,
  visibleTableRef,
  totalRows,
}: UseNavTableVisibleRowsOptions) {
  const [visibleRowCount, setVisibleRowCount] = useState(
    NAV_TABLE_DEFAULT_VISIBLE_ROWS,
  );

  useLayoutEffect(() => {
    const notes = notesRef.current;
    const measureTable = measureTableRef.current;
    const measureFooter = measureFooterRef.current;
    const visibleTable = visibleTableRef.current;
    if (!notes || !measureTable) return;

    const update = () => {
      const isXlLayout = window.matchMedia(NAV_TABLE_XL_MEDIA).matches;

      if (!isXlLayout) {
        setVisibleRowCount(
          Math.min(NAV_TABLE_DEFAULT_VISIBLE_ROWS, totalRows),
        );
        return;
      }

      if (visibleTable) {
        measureTable.style.width = `${visibleTable.getBoundingClientRect().width}px`;
      }

      const thead = measureTable.querySelector("thead");
      const rows = measureTable.querySelectorAll("tbody tr");
      const notesHeight = notes.offsetHeight;

      if (!thead || rows.length === 0 || notesHeight === 0) {
        setVisibleRowCount(
          Math.min(NAV_TABLE_DEFAULT_VISIBLE_ROWS, totalRows),
        );
        return;
      }

      const readMoreReserve =
        measureFooter?.getBoundingClientRect().height ??
        NAV_TABLE_READ_MORE_RESERVE_PX;

      const count = getNavTableVisibleRowCount({
        notesHeight,
        headerHeight: thead.getBoundingClientRect().height,
        rowHeights: Array.from(rows).map(
          (row) => row.getBoundingClientRect().height,
        ),
        readMoreReserve,
      });

      setVisibleRowCount(Math.min(count, totalRows));
    };

    update();
    void document.fonts.ready.then(update);

    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(notes);
    resizeObserver.observe(measureTable);
    if (measureFooter) {
      resizeObserver.observe(measureFooter);
    }
    if (visibleTable) {
      resizeObserver.observe(visibleTable);
    }

    const xlMedia = window.matchMedia(NAV_TABLE_XL_MEDIA);
    xlMedia.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      resizeObserver.disconnect();
      xlMedia.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, [measureFooterRef, measureTableRef, notesRef, totalRows, visibleTableRef]);

  return { visibleRowCount };
}
