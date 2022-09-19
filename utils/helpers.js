module.exports = {
    format_date: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleString();
      },

    format_content: (content) => {
        if(content.length > 100) {
            return (content.substring(0,100) + "...");
        } else {
            return content;
        }
    },

    capitalize: (word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    }
};
