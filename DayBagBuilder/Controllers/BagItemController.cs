using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DayBagBuilder.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace DayBagBuilder.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BagItemController : ControllerBase
   {
        HikingBagContext hb = new HikingBagContext();

        [HttpGet("ShowAllBagItems")]
        public List<BagItem> ShowAllBagItems()
        {
            return hb.BagItems.ToList();
        }

        [HttpGet("GetBagItemByID/{id}")]
        public BagItem GetBagItemByID(int id)
        {
            return hb.BagItems.Where(x => x.Id == id).First();
        }

        [HttpPut("CreateNewBagItem")]
        public string CreateBagItem(BagItem b)
        {
            hb.BagItems.Add(b);
            hb.SaveChanges();
            return $"{b.ItemName} was successfully added to the database";
        }

        [HttpDelete("DeleteBagItem/{id}")]
        public string DeleteBagItem(int id)
        {
            BagItem b = hb.BagItems.Find(id);
            hb.BagItems.Remove(b);
            hb.SaveChanges();
            return $"{b.ItemName} was successfully removed from the database";
        }

        [HttpPost("UpdateBagItem/{id}")]
        public string UpdateBagItem(int id, BagItem updatedBagItem)
        {
            BagItem b = hb.BagItems.Find(id);

            b.ItemName = updatedBagItem.ItemName;
            b.ForCold = updatedBagItem.ForCold;
            b.ForHot = updatedBagItem.ForHot;
            b.ForRain = updatedBagItem.ForRain;
            b.ForSnow = updatedBagItem.ForSnow;
            b.ForSunny = updatedBagItem.ForSunny;

            hb.BagItems.Update(b);
            hb.SaveChanges();

            return $"Bag Item at ID {b.Id} has been updated";
        }
   }


}

