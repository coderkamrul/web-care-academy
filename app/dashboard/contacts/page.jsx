"use client"
import { useEffect, useState } from "react"
import axios from "axios"

export default function ContactsDashboard() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("/api/contact")
        setContacts(res.data.contacts)
      } catch (err) {
        console.error("Error fetching contacts:", err)
      }
    }
    fetchContacts()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Form Submissions</h1>
      <table className="w-full border border-gray-200 dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Source</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((c) => (
            <tr
              key={c._id}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="p-3">{c.name}</td>
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.phone}</td>
              <td className="p-3">{c.howDidYouHearAboutUs}</td>
              <td className="p-3">{c.message}</td>
              <td className="p-3">
                {new Date(c.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
