import Link from "next/link";
import Image from "next/image";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import styles from "@/styles/Event.module.css";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

export default function EventPage({ evt }) {
  const router = useRouter();
  const deleteEvent = async (e) => {
    if (confirm("Are You Sure To Delete ?")) {
      const res = await fetch(`${API_URL}/events/${evt.id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.massage);
      } else {
        router.push("/events");
      }
    }
  };

  return (
    <Layout title="Single Event | Slug">
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit
            </a>
          </Link>

          <Link href="#">
            <a onClick={deleteEvent} className={styles.delete}>
              <FaTimes /> Delete
            </a>
          </Link>
        </div>

        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        <ToastContainer />

        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.large.url} width={960} height={600} />
          </div>
        )}

        <h4>Performers:</h4>
        <p>{evt.performers}</p>
        <h4>Description:</h4>
        <p>{evt.description}</p>
        <h4>Venue: {evt.venue}</h4>
        <p>Address : {evt.address}</p>

        <Link href="/events">
          <a className={styles.back}> {">>"} Go Back </a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { slug } }) {
  const res = await fetch(`${API_URL}/events/?slug=${slug}`);
  const events = await res.json();
  return {
    props: {
      evt: events[0],
    },
  };
}
