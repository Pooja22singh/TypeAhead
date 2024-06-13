# A Typeahead component, also known as an autocomplete or autosuggest component, is a user interface element commonly found in search boxes or form inputs. Its primary function is to provide real-time       suggestions to users as they type, based on the characters entered into the input field. This enhances user experience by reducing the effort required to find relevant information, speeding up data entry, and minimizing errors.

# This project focuses on providing an offline feature to the Typeahead
  Tries are the ideal data structure for storing autocomplete results.
  Here the fallback data is kept in memory, but ideally should be moved to client storage for optimal offline support(explained below). The aim of this project is to show how Tries can be used to support large 
  sets of suggestions data where data can have common prefixes.

# Choosing a DS depends on various factors
  1. Size of the dataset :  If the data set is huge and you want to avoid storing redundant data tries are the way to go for but if its not then a HashMap is fine
  2. Data State Timeline: If your data is likely to go stale on a frequent basis you dont want to go through the trouble of creating a trie , a HashMap is perfectly fine

# Further Improvements
  The original list of suggestions can be backed up in the browser cache, based on the size of data you can opt for either localStorage or CacheAPI.
  Post that if you go offline, use a Service Worker to intercept your fetch calls
  and provide the last updated list of data, pass it through your inmemory trie builder
  and use it, But remember always take size of dataset, data expiry and implementation complexities in mind before chosing any DS for your problem statement
