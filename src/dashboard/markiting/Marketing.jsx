import { useContext, useEffect, useState } from "react";
import { AppContext, route } from "../../App";
import MarketingForm from "./MarketingForm";
import SalesTable from "./SalesTable";
import InvoicesTable from "./InvoicesTable";
import toast from "react-hot-toast";
import "./marketing.css";
import { Link, useParams } from "react-router-dom";

const Marketing = ({ myLog }) => {
  const data = JSON.parse(localStorage.getItem("data"));
  const myId = data._id;
  const token = localStorage.getItem("token");
  const { setLoading } = useContext(AppContext);
  const userId = useParams()?.id;
  const [myData, setMyData] = useState({});
  useEffect(() => {
    console.log(myLog);
    if (myLog) {
      if (data.startMarketing === false) startMarketingFun();
      else getData();
    } else getData();
  }, []);
  const startMarketingFun = function () {
    setLoading(true);
    fetch(`${route}marketing/startMarketing`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        console.log("start marketing");
        data.startMarketing = true;
        localStorage.setItem("data", JSON.stringify(data));
        getData();
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const getData = function () {

    setLoading(true);
    fetch(
      `${route}marketing/${
        myLog ? "getMyMarketLog" : `getMarketLog/${userId}`
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setMyData(res.marketLog);
        console.log(res);
        if (res.marketLog.role && myLog) {
          data.role = res.marketLog.role;
          localStorage.setItem("data", JSON.stringify(data));
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <div className="p-6 space-y-6 bg-main rounded-2xl border border-gray m-6 sm:m-12">
        <h2 className="text-center font-semibold text-lg">
          إدعو المزيد من الأصدقاء
        </h2>
        {myLog && (
          <button
            className="space-x-2 block w-fit mx-auto px-6 py-3 border border-gold rounded-xl text-gold font-semibold text-lg my-4"
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/register?inviteId=${myId}`
              );
              toast.success("تم نسخ رابط الدعوه");
            }}
          >
            اضغط هنا لتنسخ رابط دعوتك            <i className="fa-regular fa-copy"></i>
          </button>
        )}
        {(data.role === "marketer" || data.role === "admin") && (
          <>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border space-y-2 border-gray rounded-md p-6">
                <h4 className="px-6 w-fit mx-auto border-b border-b-gray pb-2 mb-4 text-xl font-semibold">
                    إجمالي المبيعات لهذا الشهر
                </h4>
                <div className="flex">
                  <div className="flex-col w-full  flex gap-4 items-center">
                    <span className="font-semibold">فوق ال 500 دولار</span>
                    <span>${myData?.totalSalesMoneyGT500}</span>
                  </div>
                  <div className="flex-col w-full border-r border-r-gray flex gap-4 items-center">
                    <span className="font-semibold">تحت ال 500 دولار</span>
                    <span>${myData?.totalSalesMoneyLT500}</span>
                  </div>
                </div>
              </div>
              <div className="border space-y-2 border-gray rounded-md p-6">
                <h4 className="px-6 w-fit mx-auto border-b border-b-gray pb-2 mb-4 text-xl font-semibold">
                  نسبة الربح لهذا الشهر{" "} 
                </h4>
                <div className="flex">
                  <div className="flex-col w-full  flex gap-4 items-center">
                    <span className="font-semibold">فوق ال 500 دولار</span>
                    <span>%{myData?.percentageGT500}</span>
                  </div>
                  <div className="flex-col w-full border-r border-r-gray flex gap-4 items-center">
                    <span className="font-semibold">تحت ال 500 دولار</span>
                    <span>%{myData?.percentageLT500}</span>
                  </div>
                </div>
              </div>
              <div className="border space-y-2 border-gray rounded-md p-6">
                <h4 className="px-6 w-fit mx-auto border-b border-b-gray pb-2 mb-4 text-xl font-semibold">
                  إجمالي الربح لهذا الشهر
                </h4>
                <div className="flex">
                  <div className="flex-col w-full  flex gap-4 items-center">
                    <span className="font-semibold">فوق ال 500 دولار</span>
                    <span>${myData?.profitsGT500}</span>
                  </div>
                  <div className="flex-col w-full border-r border-r-gray flex gap-4 items-center">
                    <span className="font-semibold">تحت ال 500 دولار</span>
                    <span>${myData?.profitsLT500}</span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="items-center flex-wrap flex justify-between">
              {myData?.invitor?._id && (
                <p className="text-xs">
                  تمت {myLog ? "دعوتك" : "دعوته"} بواسطه :{" "}
                  {myData?.invitor?.email}
                </p>
              )}
            </div> */}

            <div className="space-y-4">
              <h2 className="font-semibold text-center text-xl">
                المبيعات فوق ال 500 دولار{" "}
              </h2>

              <SalesTable data={myData?.transactionsGT500} />
            </div>
            <div className="space-y-4">
              <h2 className="font-semibold text-center text-xl">
                المبيعات تحت ال 500 دولار{" "}
              </h2>

              <SalesTable data={myData?.transactionsLT500} />
            </div>
            {/* {(data.role === "marketer" || data.role === "admin") && (
              <>
                <div className="space-y-4 py-4 my-4 border-t border-t-[gray]">
                  <h2 className="font-semibold text-center text-xl">
                    ارباحي من العملاء
                  </h2>

                  <SalesTable
                    data={myData?.cutomerProfitsTransactions}
                    isCustomer={true}
                  />
                </div>
                <div className="space-y-4 py-4 my-4 border-y border-y-[gray]">
                  <h2 className="font-semibold text-center text-xl">
                    الأرباح من الفريق{" "}
                  </h2>

                  <SalesTable
                    data={myData?.transactions}
                    haveGeneration={true}
                  />
                </div>
              </>
            )}

            <div className="space-y-4">
              <h2 className="font-semibold text-center text-xl">الفواتير </h2>

              <InvoicesTable getData={getData} data={myData?.invoices} />
            </div> */}
            <div className="space-y-4">
              <h2 className="font-semibold text-center text-xl">الفواتير </h2>

              <InvoicesTable getData={getData} data={myData?.invoices} />
            </div>
          </>
        )}
        <Link
          to={"/marketing/team"}
          className="space-x-2 block w-fit mx-auto px-6 py-3 border border-gold rounded-xl text-gold font-semibold text-lg my-4"
        >
          عرض الاشخاص الذين دعوتهم
        </Link>
      </div>
      {data.role === "customer" && myLog && <MarketingForm />}
    </>
  );
};

export default Marketing;
