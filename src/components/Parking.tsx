import { ReactNode, useEffect, useState } from "react";
import SpotTable from "./SpotTable";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import {
  selectFormattedDate,
  selectUser,
  setReservation,
} from "../features/userSlice";
import { changeSpotState, setParkingSpots } from "../features/parkingSlice";
import ConfirmModal from "./common/ConfirmModal";
import Input from "./common/Input";
import Button from "./common/Button";
import Map from "./Map";
import {
  fetchParkingData,
  updateParkingSpotState,
} from "../app/services/parkingService";
import {
  addReservation,
  deleteReservation,
} from "../app/services/reservationService";

/**
 * Props for the Parking component.
 * @typedef {Object} ParkingProps
 * @property {string} name - The name of the parking.
 */
interface ParkingProps {
  name: string;
}

/**
 * Parking component.
 */
function Parking({ name }: ParkingProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => selectUser(state));
  const reservationDate = useSelector((state: RootState) =>
    selectFormattedDate(state)
  );
  const spots = useSelector((state: RootState) => state.parking.spots);
  //  Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    data: {},
    header: "",
    body: "" as ReactNode,
    color: "",
  });

  useEffect(() => {
    document.title = name;
  }, []);

  useEffect(() => {
    fetchParkingData().then((spots) => dispatch(setParkingSpots(spots)));
  }, [dispatch]);

  // Generate the content for booking modal
  const getBookingContent = (spot: Spot | undefined) => {
    return (
      <>
        <p>Êtes-vous sûr de vouloir réserver la place n°{spot?.number} ?</p>
        <p className="mt-4 mb-2">Un email de confirmation vous sera envoyé</p>
        <Input
          id="email"
          type="email"
          width="w-[300px]"
          placeholder="Saisir votre email"
          required={true}
        />
      </>
    );
  };

  // Set the content and open the modal
  const setModal = (spot: Spot | undefined, action: "book" | "cancel") => {
    if (action == "book") {
      setModalContent({
        data: { spot: spot, action: action },
        header: "Confirmation de réservation",
        body: getBookingContent(spot),
        color: "blue",
      });
    } else if (action == "cancel") {
      setModalContent({
        data: { spot: spot, action: action },
        header: "Confirmation d'annulation",
        body: "Êtes-vous sûr de vouloir annuler votre réservation ?\nAttention cette action est irréversible.",
        color: "red",
      });
    }
    setIsModalOpen(true);
  };

  // Handle spot state change based on user action in the modal
  const handleChangeState = async (
    { spot, action }: any,
    event?: any,
    confirm: boolean = false
  ) => {
    setIsModalOpen(false);

    if (confirm) {
      try {
        await updateParkingSpotState(spot);
        dispatch(changeSpotState({ spot }));

        if (action === "cancel") {
          await deleteReservation(user.reservation?.id ?? "");
          dispatch(setReservation(null));
        } else if (action === "book") {
          const _id = await addReservation(
            user.id,
            spot._id,
            event?.target.email.value
          );
          dispatch(
            setReservation({
              _id,
              spot,
              email: event?.target.email.value,
            })
          );
        }
      } catch (error) {
        console.error("Error handling state change:", error);
      }
    }
  };

  return (
    <>
      <div className="min-h-screen">
        {/* GRADIENT */}
        <div className="absolute h-full inset-0 bg-gradient-to-tr from-pink-200 to-blue-300 to-90% z-0 opacity-50"></div>
        {/* APP */}
        <div className="mx-auto w-5/6 md:w-4/6 2xl:w-5/6 max-w-[1250px] py-14 sm:pt-28 grid grid-cols-1 LG:grid-cols-2 2xl:grid-cols-7 gap-10 relative z-10">
          {/* HEADER */}
          <div className="2xl:col-span-5 lg:col-span-2">
            <h1 className="text-4xl font-bold mb-3 flex flex-wrap gap-x-2">
              <span className=" pt-0.5">Bienvenue au</span>
              <span className="whitespace-nowrap bg-indigo-200 px-2 pt-0.5 pb-1.5 rounded-md">
                {name}
              </span>
            </h1>

            <h2 className="text-xl mb-7">
              Découvrez le charme authentique d'Annecy grâce à notre parking en
              ligne.
            </h2>
            <p className="text-justify">
              Depuis notre portail, accédez facilement aux différentes places de
              stationnement et profitez pleinement de votre séjour dans notre
              ville. Que vous souhaitiez obtenir un ticket de parking, libérer
              une place ou simplement consulter la disponibilité des places,
              notre plateforme vous offre une expérience pratique et sans
              tracas. Nous espérons que vous apprécierez votre séjour à Annecy
              et que notre service de stationnement contribuera à rendre votre
              visite encore plus agréable.
            </p>
          </div>

          {/* MAP */}
          <div className="2xl:col-span-2 row-span-2 min-h-[250px]">
            <Map />
          </div>

          {/* TABLE */}
          <div className="2xl:col-span-3 h-[465px] px-5 md:px-10 py-7 shadow-sm border rounded-md bg-zinc-100 order-last 2xl:order-none">
            <SpotTable
              title="Places disponibles"
              setModal={setModal}
              spots={spots.filter((spot: any) => spot)}
            />
          </div>

          {/* RESERVATION */}
          <div className="2xl:col-span-2 px-5 md:px-10 py-7 shadow-sm border rounded-md h-fit bg-zinc-100 ">
            <h3 className="mb-4 font-bold uppercase">Ma réservation</h3>
            {user.reservation ? (
              <>
                <ul className="mb-5">
                  <li>
                    Vous avez réservé la place n°
                    {user.reservation?.spot?.number}
                  </li>
                  <li>{reservationDate}</li>
                  <li className="mt-2">Vos coordonées : </li>
                  <li>{user.reservation?.email}</li>
                </ul>
                <Button
                  text="Annuler ma réservation"
                  color="red"
                  onClick={() => setModal(user.reservation?.spot, "cancel")}
                ></Button>
              </>
            ) : (
              <p>Vous n'avez actuellement pas de réservation</p>
            )}
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen ? (
        <ConfirmModal content={modalContent} toggleModal={handleChangeState} />
      ) : null}
    </>
  );
}

export default Parking;
