const { httpGet } = require('./mock-http-interface');

const getMessage = async (url) => {
  const response = await httpGet(url);

  const message = JSON.parse(response.body).message;

  if(response.status === 200){
    return { 'Arnie Quote': message };
  }else{
    return { 'FAILURE': message };
  }
};

const getArnieQuotes = async (urls) => {
  try{
    const results = await Promise.all(urls.map(async (url) => {
      return await getMessage(url);
    }));

    return results;
  }catch(err){
    console.error(err.message);
    throw err
  }
};

module.exports = {
  getArnieQuotes,
};
