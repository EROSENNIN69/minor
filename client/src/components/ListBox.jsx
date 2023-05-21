import { Fragment, useState } from 'react'
import { Listbox } from '@headlessui/react';
import { SelectorIcon, CheckIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilter, setRoomFilter, setCategoryFilter } from "../store/filterSlice";

const ListBox = (props) => {
  const {options, type} = props;
  const { price, rooms, category } = useSelector(state => state.filter);
  const [selectedOption, setSelectedOption] = useState(type === "category" ? category : type === "price" ? price : rooms);
  const dispatch = useDispatch();
  const handleSelect = e => {
    setSelectedOption(e);
    if (type === "room") {
      dispatch(setRoomFilter(e))
    } else if (type === "price") {
      dispatch(setPriceFilter(e));
    } else if (type === "category") {
      dispatch(setCategoryFilter(e));
    }
  };
  return (
    <div className="w-full">
      <Listbox value={selectedOption} onChange={handleSelect}>
        <div>
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white dark:bg-neutral-800 rounded-lg sm:text-sm cursor-pointer border-2 border-gray-400 ">
            <span className="block truncate">{(type === "category" ? category || "Select Category" : type === "price" ? price || "Price Order" : rooms || "Select Rooms") || selectedOption}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
        </div>
        <Listbox.Options className="w-full rounded py-2 bg-slate-50 dark:bg-neutral-800 border-1 border-gray-400 shadow-sm mt-2 max-h-48 listbox__sidebar overflow-y-scroll">
          {options.map((ans, id) => (
            <Listbox.Option
              key={id}
              value={ans}
              as={Fragment}
              className={({ active }) => `${active ? "bg-indigo-500 text-white" : "text-black dark:text-gray-300"} flex items-center px-4 py-2 cursor-pointer rounded`}
            >
              {({ active, selected }) => (
                <div className='flex items-center'>
                  <div className='w-[3vw]'>
                    {selected ? (
                      <div
                        className={`${active ? 'text-white' : 'text-indigo-600'
                          } `}>
                        <CheckIcon className="w-5 h-5" aria-hidden="true" />
                      </div>
                    ) : null}
                  </div>
                  <div className={`${selected ? "font-medium" : "font-normal"} truncate`}>
                    {ans}
                  </div>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
};

export default ListBox;