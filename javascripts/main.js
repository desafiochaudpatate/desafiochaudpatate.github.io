function getIngredients(full_name)
{
  foods = ["coco", "cenoura", "repolho", "casca"];
  document.getElementById("ingredients").innerHTML = "";
  good_foods = [];

  for (i = 0; i < foods.length; i++)
  {
    food = foods[i];
    used_letters = [];
    rotten = 0;
    for (j = 0; j < food.length; j++)
    {
      letter = food[j];
      okay = 0;
      subname = full_name;
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
      good_foods.push(food);
      document.getElementById("ingredients").innerHTML += food + " ";
    }
  }
  
  return good_foods;
}
