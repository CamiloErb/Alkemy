import { useFormik } from "formik";
import { useState } from "react";
import { IssueClosedIcon } from "@primer/octicons-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getHeroes, resetList } from "./searchSlice";
import { addHero } from "../MyTeam/teamSlice";
import { Modal } from "react-bootstrap";
import { HeroCardSkeleton } from "./HeroCardSkeleton";
import Swal from "sweetalert2";

const validate = (values) => {
  const errors = {};
  if (!values.heroe) {
    errors.heroe = "field required";
  }
  return errors;
};

export const HeroeSearch = () => {
  const { list, status } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { myTeam } = useSelector((state) => state.team);
  const heroesId = myTeam.map((heroe) => heroe.id);
  const heroesAlignment = myTeam.map((heroe) => heroe.biography.alignment);
  const goodCount = heroesAlignment.filter((v) => v === "good").length;
  const badCount = heroesAlignment.filter((v) => v === "bad").length;

  const formik = useFormik({
    initialValues: {
      heroe: "",
    },
    validate,
    onSubmit: async (values) => {
      formik.resetForm();
      setIsOpen(!isOpen);
      await dispatch(getHeroes(values.heroe))
    },
  });

  const addHeroes = (heroe) => {
    const alignment = heroe.biography.alignment;
    if (myTeam.length >= 6) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Your team is full!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (goodCount >= 3 && alignment === "good") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Only 3 good heroes per team!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else if (badCount >= 3 && alignment === "bad") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Only 3 bad heroes per team!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      dispatch(addHero(heroe));
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
    dispatch(resetList())
  };

  return (
    <div>
      <div className="position-relative ">
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group  ">
            <input
              placeholder="Search a hero"
              className="form-control"
              id="heroe"
              name="heroe"
              type="text"
              value={formik.values.heroe}
              onChange={formik.handleChange}
            ></input>
            <button className="btn btn-secondary" type="submit">
              Search
            </button>
          </div>
        </form>

        <StyledModal size="xl" show={isOpen} onHide={handleModal} centered>
          <Modal.Header>
            <h2>Pick a hero</h2>
          </Modal.Header>
          <Modal.Body>
            <div className="row  p-3 m-auto">
              {status == "loading" ? (
                <>
                  <HeroCardSkeleton />
                  <HeroCardSkeleton />
                  <HeroCardSkeleton />
                </>
              ) : list.length > 0 ? (
                list.map((heroe, index) => {
                  return (
                    <div
                      key={heroe.id}
                      className="col-md-4 card  bg-dark border"
                    >
                      <h4 className="card-title m-2 text-white">
                        {heroe.name}
                      </h4>
                      <div className="h-100">
                        <img
                          alt="heroeimage"
                          className="card-img img-fluid"
                          src={heroe.image.url}
                        />
                      </div>
                      {heroesId.includes(heroe.id) ? (
                        <div
                          className="btn btn-success m-2 "
                        >
                          <IssueClosedIcon size={24} />
                          already in my team
                        </div>
                      ) : (
                        <button
                          data-testid={`add-button-${index}`}
                          className="btn btn-primary m-2 "
                          onClick={() => addHeroes(heroe)}
                        >
                          Add to my team
                        </button>
                      )}
                    </div>
                  );
                })
              ) : (
                <div className="w-100 text-center">
                  <h3 className="text-secondary">Not found</h3>
                </div>
              )}
            </div>
          </Modal.Body>
        </StyledModal>
      </div>
    </div>
  );
};

const StyledModal = styled(Modal)`
  font-family: "Bebas Neue", cursive;
  background-color: "black";
`;
