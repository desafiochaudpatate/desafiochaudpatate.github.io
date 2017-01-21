foods = [];
fullName = "";

function handleQueryResponse(response)
{
  //TODO: lose the first result of each column (title)
  if (response.isError()) {
    alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
  
  var data = response.getDataTable();
  foods = data.getDistinctValues(0);
  getGoodFoods();
}

function getIngredients(full_name)
{
  //TODO: add a "select language" field
  //TODO: add a field to specify quantity of results to show on screen
  //TODO: get specific sheet on document, according to selected language
  //TODO: get ingredients from different columns
  fullName = accent_fold(full_name).toLowerCase();
  //foods = ["coco", "cenoura", "repolho", "pão", "massa", "cereal", "gordura", "vegano", "vegana", "vegetariano", "vegetariana", "pancs", "rosa", "mandioca", "carne", "tâmara", "doce", "marisco", "tomate", "damasco", "nectarina", "erva-doce", "codorna", "doce", "vaca", "mate", "anis", "amora", "menta", "osso", "risoto", "ova", "ovo", "torta", "caviar", "morno", "cookie", "cheesecake", "tacos", "amido", "endro", "mostarda", "cítrico", "mandarina", "assado", "carneiro", "cordeiro", "ovelha", "pizza", "acre", "nata", "amêndoa", "aveia", "coca", "coca-cola", "ostra", "ricota", "vietnã", "vieira", "camarão", "corada", "corado", "iogurte", "síria", "canadá", "mel", "melado", "melada", "coentro", "arder", "pimenta", "chá", "especiaria", "índia", "cone", "purê", "maçã", "carolina", "profiterole", "negro", "preto", "sal", "cru", "aro", "coral", "licor", "pinot", "suco", "pasta", "copa", "pato", "prato", "sopa", "pé", "óleo", "lata", "canola", "louro", "praia", "cortar", "canela", "pote", "rolo", "cuia", "risole", "pera", "picles", "aipo", "panceta", "jabuticaba", "panc", "polenta", "naan", "calor", "seco", "porco", "torrar", "porto", "sagu", "roma", "romã", "rosca", "amendoim", "manjericão", "pesto", "cru", "isca", "nigéria", "rã", "guaco", "arruda", "grécia", "rússia", "sugar", "siri", "caranguejo", "pimenta", "orégano", "suécia", "regar", "cupim", "aipim", "mali", "estados unidos", "panela", "faca", "frio", "fogo", "madalena", "mandolim", "cifão", "anel", "liso", "lisa", "azul", "anil"];
  //var url='https://docs.google.com/spreadsheets/d/1rgFHL4Mxkio-l5mcI8kDtn8k5QzmOs2MG-0g58N3j5I/gviz/tq?tq=select+A'
  var url='https://docs.google.com/spreadsheets/d/1rgFHL4Mxkio-l5mcI8kDtn8k5QzmOs2MG-0g58N3j5I'
  var query = new google.visualization.Query(url);
  query.setQuery('select instrumentos, frutas');
  query.send(handleQueryResponse);
}

function getGoodFoods()
{
  //TODO: add following word groups to the list: fruits and vegetables, plates, edible animals, countries, colors, edible fungi,
  //spices, diet types, textures, shapes, kitchen tools
  //TODO: disregard graphic accentuation (including the tilde and cedilla and ')
  //TODO: crawl the web (maybe wikipedia is enough?) getting food descriptions and model the documents to get only food-related words
  document.getElementById("ingredients").innerHTML = "";
  good_foods = [];

  for (i = 0; i < foods.length; i++)
  {
    food = foods[i];
    if (food == null)
    {
      continue;
    }
    food = accent_fold(food).toLowerCase();
    used_letters = [];
    rotten = 0;
    for (j = 0; j < food.length; j++)
    {
      letter = food[j];
      okay = 0;
      subname = fullName;
      while (subname.indexOf(letter) > -1)
      {
        where = subname.indexOf(letter);
        if (used_letters[where] == 1)
        {
          subname = subname.slice(where+1);
        }
        else
        {
          used_letters[where] = 1;
          okay = 1;
          break;
        }
      }
      if (!okay)
      {
        rotten = 1;
      }
    }
    if (!rotten)
    {
      good_foods.push(foods[i]);
      document.getElementById("ingredients").innerHTML += foods[i] + " ";
    }
  }
  
  return good_foods;
}
