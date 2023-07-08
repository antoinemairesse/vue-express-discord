import moment from "moment";

/**
 *  sort messages and group them in a map where each key is a day (for exemple 22 August 2022),
 *  the value is an array of messages that have been sent on the same day (= key)
 */
export const messages = (state, getters, rootState) => {
  const selectedChannel = rootState.channel.selectedChannel;
  if (selectedChannel && state.messages.get(selectedChannel._id)) {
    let messagesPerDay = new Map();
    const messages = state.messages.get(selectedChannel._id);

    // group messages per day
    messages.forEach((message) => {
      const date = moment(message.createdAt).startOf("day").format();
      const arr = messagesPerDay.get(date) || [];
      arr.push(message);
      messagesPerDay.set(date, arr);
    });

    // sort map keys (each key is a unique day)
    messagesPerDay = new Map(
      [...messagesPerDay].sort(function (a, b) {
        return new Date(b[0]) - new Date(a[0]);
      }),
    );

    // sort messages
    messagesPerDay.forEach((value) => {
      value.sort(function (a, b) {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    });

    return messagesPerDay;
  }
};
