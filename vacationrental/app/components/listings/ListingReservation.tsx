"use client";

import { Range } from "react-date-range";

import { User } from "@prisma/client";
import { List } from "postcss/lib/list";
import FavoriteButton from "../FavoriteButton";
import Calendar from "../inputs/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  disabled: boolean;
  dateRange: Range;
  disabledDates: Date[];
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  id: string;
  currentUser?: User | null;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  totalPrice,
  disabled,
  dateRange,
  disabledDates,
  onChangeDate,
  onSubmit,
  id,
  currentUser,
}) => {
  return (
    <div className="p-6 bg-white rounded-xl border-[1px] border-neutral-200 shadow-lg">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl text-semibold">${price} night</div>
          <FavoriteButton listingId={id} currentUser={currentUser} />
        </div>
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />
        <div
          className="
            flex
            flex-row
            items-center
            justify-between
            text-md
            font-semibold
          "
        >
          <div>Total Price</div>
          <div>${totalPrice}</div>
        </div>
        <div className="w-full">
          <Button
            small
            label="Request to book"
            onClick={onSubmit}
            disabled={disabled}
          />
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
