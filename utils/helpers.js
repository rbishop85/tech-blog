module.exports = {
    // Formats date including time
    format_date: (date) => {
        return date.toLocaleString();
      },

    // Formats date as just the month, day and year
    format_date_short: (date) => {
        return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: '2-digit'});
      },

    // Displays only the first 500 characters of content
    format_content: (content) => {
        if(content.length > 500) {
            return (content.substring(0,500) + "...");
        } else {
            return content;
        }
    },

    // Capitalizes the first character in a given word
    capitalize: (word) => {
        return (word.charAt(0).toUpperCase() + word.slice(1));
    },

    // Helper function for handlebars that allows {{#if}} functionality but allows you to compare two variables
    if_eq: (a, b, opts) => {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    }
};
