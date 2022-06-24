using DayBagBuilder.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DayBagBuilder.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BagSaveController : ControllerBase
    {
        HikingBagContext hb = new HikingBagContext();

        [HttpGet("ShowAllBagSave")]
        public List<BagSave> ShowAllBagSave()
        {
            return hb.BagSaves.ToList();
        }

        [HttpGet("ShowBagsByUserName/{userName}")]
        public List<BagSave> GetBagSavesByUserName(string userName)
        {
            return hb.BagSaves.Where(x => x.UserName == userName).ToList();
        }

        [HttpPut("CreateBagSave")]
        public string CreateBagSave(BagSave b)
        {
            hb.BagSaves.Add(b);
            hb.SaveChanges();
            return $"{b.Id} was successfully added to the database";
        }

        [HttpDelete("DeleteBagSave/{id}")]
        public string DeleteBagSave(int id)
        {
            BagSave b = hb.BagSaves.Find(id);
            hb.BagSaves.Remove(b);
            hb.SaveChanges();
            return $"{b.Id} was successfully deleted from the database";
        }

        [HttpPost("UpdateBagSave/{id}")]
        public string UpdateBagSave(int id, BagSave updatedBagSave)
        {
            BagSave b = hb.BagSaves.Find(id);
            b.UserName = updatedBagSave.UserName;
            b.ItemName = updatedBagSave.ItemName;

            hb.BagSaves.Update(b);
            hb.SaveChanges();

            return $"BagSave at index {b.Id} has been updated";
        }


    }
}
