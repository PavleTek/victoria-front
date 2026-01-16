import React, { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import {
  TruckIcon,
  PaperAirplaneIcon,
  GlobeAltIcon,
} from "@heroicons/react/20/solid";

type OperationType = "sea" | "air" | "land";

interface Tab {
  name: string;
  id: OperationType;
  icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  current: boolean;
}

function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

const Operations: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<OperationType>("sea");

  const tabs: Tab[] = [
    { name: "Sea", id: "sea", icon: GlobeAltIcon, current: currentTab === "sea" },
    { name: "Air", id: "air", icon: PaperAirplaneIcon, current: currentTab === "air" },
    { name: "Land", id: "land", icon: TruckIcon, current: currentTab === "land" },
  ];

  const handleTabChange = (tabId: OperationType) => {
    setCurrentTab(tabId);
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case "sea":
        return (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Sea Operations</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500">Sea operations content will be displayed here.</p>
            </div>
          </div>
        );
      case "air":
        return (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Air Operations</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500">Air operations content will be displayed here.</p>
            </div>
          </div>
        );
      case "land":
        return (
          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Land Operations</h2>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="text-gray-500">Land operations content will be displayed here.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Operations</h1>
        <p className="text-gray-600">Manage operations for sea, air, and land transportation</p>
      </div>

      <div>
        <div className="grid grid-cols-1 sm:hidden">
          {/* Mobile dropdown */}
          <select
            value={currentTab}
            onChange={(e) => handleTabChange(e.target.value as OperationType)}
            aria-label="Select a tab"
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary-600"
          >
            {tabs.map((tab) => (
              <option key={tab.id} value={tab.id}>
                {tab.name}
              </option>
            ))}
          </select>
          <ChevronDownIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
          />
        </div>

        {/* Desktop tabs */}
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav aria-label="Tabs" className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  aria-current={tab.current ? "page" : undefined}
                  className={classNames(
                    tab.current
                      ? "border-primary-600 text-primary-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium"
                  )}
                >
                  <tab.icon
                    aria-hidden="true"
                    className={classNames(
                      tab.current ? "text-primary-600" : "text-gray-400 group-hover:text-gray-500",
                      "mr-2 -ml-0.5 size-5"
                    )}
                  />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default Operations;

