import { Children, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import Modal from "@/components/Modal";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { FaImage } from "react-icons/fa";
import ImageUpload from "@/components/ImageUpload";

export default function EditEventPage({ evt }) {
  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });

  const [imagePreview, setImagePreview] = useState(
    evt.image ? evt.image.formats.medium.url : null
  );

  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //  Validation
    const hasEmptyField = Object.values(values).some(
      (element) => element === ""
    );

    if (hasEmptyField) {
      toast.error("Please Fill Up All Empty Field");
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    });
    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      router.push(`/events/${evt.slug}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const imageUploaded = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/events/${evt.id}`);
    const data = res.json();
    setImagePreview(data.image.thumbnail.url);
    setShowModal(false);
  };

  return (
    <Layout title="Add Event">
      <Link href="/events"> Go Back </Link>
      <h1> Edit Event </h1>

      <ToastContainer />

      <div className={styles.update}>
        <form
          onSubmit={handleSubmit}
          className={styles.form}
          autoComplete="off"
        >
          <div className={styles.grid}>
            <div>
              <label htmlFor="name"> Event Name </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="venue"> Event Venue </label>
              <input
                type="text"
                id="venue"
                name="venue"
                value={values.venue}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label htmlFor="address"> Event Address </label>
              <input
                type="text"
                id="address"
                name="address"
                value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="performance"> Event Performers </label>
              <input
                type="text"
                id="performers"
                name="performers"
                value={values.performers}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="date"> Event Date </label>
              <input
                type="date"
                id="date"
                name="date"
                value={moment(values.date).format("yyyy-MM-DD")}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="time"> Event Time </label>
              <input
                type="text"
                id="time"
                name="time"
                value={values.time}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="description">Event Description </label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleInputChange}
              id="description"
              cols="30"
              rows="10"
            />
          </div>
          <input type="submit" value="Update Event" className="btn" />
        </form>

        <h3> Event Images </h3>
        {imagePreview ? (
          <Image src={imagePreview} width={170} height={100} />
        ) : (
          <div>
            {" "}
            <p> No Images Uploaded </p>{" "}
          </div>
        )}

        <div>
          <button
            onClick={() => setShowModal(true)}
            className="btn-secondary btn-icon"
          >
            <FaImage /> Set Image
          </button>
        </div>

        <Modal show={showModal} onClose={() => setShowModal(false)}>
          <ImageUpload evtId={evt.id} imageUploaded={imageUploaded} />
        </Modal>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`${API_URL}/events/${id}`);
  const evt = await res.json();

  return {
    props: { evt },
  };
}
