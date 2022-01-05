import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionType } from "../redux/constants/action-types";
import ButtonIcon from "../containers/ButtonIcon";
export default function Table({
  headers = [],
  data = [],
  deleteAction,
  updateAction,
}) {
  const [AllHeaders, setHeaders] = useState(headers);
  const dispatch = useDispatch();
  useEffect(() => {
    setHeaders((header) => header.concat("Action"));
  }, []);
  const Action = (header, data, index) => {
    if (header === "Action")
      return (
        <div className="flex items-center justify-around">
          {updateAction !== undefined && (
            <ButtonIcon
              icon={faEdit}
              className="mx-1"
              title="edit"
              onSubmit={(event) => {
                event.preventDefault();
                updateAction(data);
              }}
            />
          )}
          {deleteAction !== undefined && (
            <ButtonIcon
              icon={faTrashAlt}
              title="delete"
              onSubmit={(event) => {
                event.preventDefault();
                dispatch({ type: actionType.SET_LOADING, payload: true });
                deleteAction(data);
              }}
            />
          )}
        </div>
      );
    if (header === "no") return index + 1;
    if (header === "date") return data["created_at"];
    return data[header];
  };

  return (
    <div className="w-full bg-white shadow-md rounded my-6">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {AllHeaders.map(function (el, index) {
              return (
                <th className="py-3 px-3 text-center" key={index}>
                  {el}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="text-gray-600  text-sm font-light">
          {data.map(function (el, index) {
            return (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                {AllHeaders.map(function (header, i) {
                  return (
                    <td
                      key={i}
                      className="py-3 px-3 text-center whitespace-nowrap"
                    >
                      {Action(header, el, index)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
