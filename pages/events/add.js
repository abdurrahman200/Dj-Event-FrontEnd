import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { API_URL } from "@/config/index";
import Layout from "@/components/Layout";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEventPage() {
  const [values, setValues] = useState({
    name: "",
    venue: "",
    address: "",
    performance: "",
    date: "",
    time: "",
    description: "",
  });

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

    const res = await fetch(`${API_URL}/events`, {
      method: "POST",
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

  return (
    <Layout title="Add Event">
      <Link href="/events"> Go Back </Link>
      <h1> Add Event </h1>

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
              <label htmlFor="performance"> Event Performance </label>
              <input
                type="text"
                id="performance"
                name="performance"
                value={values.performance}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="date"> Event Date </label>
              <input
                type="date"
                id="date"
                name="date"
                value={values.date}
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
          <input type="submit" value="Add Event" className="btn" />
        </form>
      </div>
    </Layout>
  );
}
