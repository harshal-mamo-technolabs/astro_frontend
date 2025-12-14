import { useContext, useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useSupportData } from "../context/SupoortContext";
import { CardContext } from "../context/CardsDataContext";
import axios from "axios";
import { FaTicketSimple } from "react-icons/fa6";
import { Alert, Avatar, Button, Input, Spin, message } from "antd";
import { ArrowLeftOutlined, SendOutlined } from "@ant-design/icons";
import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { IoTicketSharp } from "react-icons/io5";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [closingTicket, setClosingTicket] = useState(false);
  const { id } = useParams();
  const { fullprofile } = useContext(CardContext);
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const { list, setList } = useSupportData();
  const [loadingMessages, setLoadingMessages] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const ticketListRef = useRef(null); // Reference for the ticket list container
  const location = useLocation();
  const currentPath = location.pathname;
  const isChatOpen = currentPath.includes("/open");
  const isChatClosed = currentPath.includes("/close");
  const filteredList = list.filter((item) => {
    // Filter based on chat open/close status
    const isOpen = isChatOpen ? !item.closed : item.closed;

    // Filter based on search query
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Return true only if both conditions are met
    return isOpen && matchesSearch;
  });

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}ticket/${id}`,
        { withCredentials: true }
      );
      setMessages(response.data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    const filterbyId = list.filter((item) => item._id === id);
    setOpen(filterbyId?.closed);
    console.log(open, "opeeennnn");
    fetchMessages();
  }, [id]);

  useEffect(() => {
    if (ticketListRef.current) {
      ticketListRef.current.scrollTop = 0;
    }
  }, [messages]);

  const handleMessageSend = async () => {
    if (!inputValue.trim()) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}ticket/${id}`,
        { message: inputValue.trim() },
        { withCredentials: true }
      );
      console.log("Message sent:", response.data);
      fetchMessages();

      const sortedList = [...list].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      setList(sortedList);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setInputValue("");
  };

  const handleclosedTicket = async (id) => {
    setClosingTicket(true);
    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}ticket/${id}`, {
        withCredentials: true,
      });
      message.success("Ticket Closed Successfully");
      navigate("/home/support");
      fetchMessages();
    } catch (error) {
      message.error(error.response.data.msgerror.response.data.msg);
    }
    setClosingTicket(false);
  };

  return (
    <>
      <Box className="bg-gradient-to-r from-indigo-700 to-purple-600 min-h-screen">
        <Box className="">
          <Navbar />
        </Box>{" "}
        <Spin spinning={loadingMessages}>
          <Spin spinning={closingTicket}>
            <div className="flex border-2 m-2">
              <div className="w-1/4 border-2 text-white h-[75vh] overflow-auto">
                <div className="m-2 flex gap-4">
                  <div className="">
                    <div className="flex gap-3 w-full text-2xl lg:text-3xl cursor-pointer font-sans text-white">
                      <ArrowLeftOutlined
                        className="lg:mt-1 mt-2"
                        onClick={() => navigate("/home/support")}
                      />
                    </div>
                  </div>
                  {/* <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Tickets"
                    className="w-full p-2 border border-gray-300 text-black rounded-lg mb-4"
                  /> */}
                  {isChatClosed ? (
                    <h2 className="text-white text-xl mt-1">Close Tickets</h2>
                  ) : (
                    <h2 className="text-white text-xl mt-1 ">Open Tickets</h2>
                  )}
                </div>
                <div ref={ticketListRef}>
                  {filteredList.length > 0 ? (
                    filteredList.map((item) => (
                      <div
                        key={item._id}
                        className={` ${
                          item._id === id ? "bg-gray-300 text-black " : ""
                        } grayscale-0 p-2 rounded-md m-2`}
                      >
                        {isChatOpen ? (
                          <Link to={`/home/chat/open/${item._id}`}>
                            <div className="flex gap-2">
                              <Avatar
                                style={{
                                  backgroundColor: "blue",
                                  verticalAlign: "middle",
                                }}
                                size="large"
                              >
                                <IoTicketSharp className="lg:text-4xl text-2xl" />
                              </Avatar>
                              <p>{item.title}</p>
                            </div>
                            <div className="flex justify-end">
                              <p>
                                {" "}
                                {new Date(item.updatedAt).toLocaleString()}
                              </p>
                            </div>
                          </Link>
                        ) : (
                          <Link to={`/home/chat/close/${item._id}`}>
                            <div className="flex gap-2">
                              <Avatar
                                style={{
                                  backgroundColor: "blue",
                                  verticalAlign: "middle",
                                }}
                                size="large"
                              >
                                <IoTicketSharp className="lg:text-4xl text-2xl" />
                              </Avatar>
                              <p>{item.title}</p>
                            </div>
                            <div className="flex justify-end">
                              <p>
                                {" "}
                                {new Date(item.updatedAt).toLocaleString()}
                              </p>
                            </div>
                          </Link>
                        )}
                      </div>
                    ))
                  ) : (
                    <h2 className="text-center mt-4 text-lg">
                      Ticket Not Found
                    </h2>
                  )}
                </div>
              </div>

              <div className="flex-1   overflow-auto">
                <div className="p-4 overflow-y-auto">
                  <div className="mb-4">
                    <div className="bg-white  p-2 mb-2 rounded-lg">
                      <p className="font-semibold">
                        Ticket ID #{messages[0]?.ticketId}
                      </p>
                      <div>
                        {list
                          .filter((item) => item._id === messages[0]?.ticketId)
                          .map((filteredItem) => (
                            <p key={filteredItem._id}>
                              <span className=" font-bold">Ticket title:-</span>{" "}
                              {filteredItem.title}
                            </p>
                          ))}
                      </div>
                    </div>
                  </div>

                  <Box className="message-list mt-10 max-h-[280px] overflow-auto">
                    {messages.map((message) => (
                      <div
                        key={message._id}
                        className={`message-item text-white flex flex-col ${
                          message.userId === fullprofile._id
                            ? "items-end  "
                            : "item-start"
                        }`}
                      >
                        <div
                          className={`${
                            message.userId === fullprofile._id
                              ? "  p-2 bg-blue-600 m-2 rounded-md min-w-[5rem]"
                              : " p-2 bg-gray-400 m-2 rounded-md min-w-[5rem] w-fit"
                          }`}
                        >
                          {" "}
                          <div className="message-text">{message.message}</div>
                          <div className="message-date flex justify-end ">
                            {new Date(message.createdAt).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </Box>
                  {isChatClosed ? (
                    <Alert
                      message="Ticket is Closed"
                      type="success"
                      className="absolute top-[87%] w-[70%] "
                    />
                  ) : (
                    <div className="p-4  absolute top-[87%] w-[70%] flex">
                      <Input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onPressEnter={handleMessageSend}
                        placeholder="Type your message..."
                        style={{ flex: 1, marginRight: 8 }}
                        className={`${closed ? "hidden" : "block"} p-2`}
                      />
                      <Button
                        className={` text-white hover:text-white ${
                          closed ? "hidden" : "block"
                        }`}
                        onClick={() => handleclosedTicket(id)}
                        icon={<FaTicketSimple />}
                      >
                        Close Ticket
                      </Button>
                      <Button
                        className={`bg-blue-600 text-white ${
                          closed ? "hidden" : "block"
                        }`}
                        onClick={handleMessageSend}
                        icon={<SendOutlined />}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Spin>
        </Spin>
      </Box>
    </>
  );
};

export default Chat;
