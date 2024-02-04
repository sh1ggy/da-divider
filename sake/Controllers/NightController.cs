using Divider.ApiModels;
using Divider.Models;
using Divider.Service;
using Microsoft.AspNetCore.Mvc;

namespace Divider.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NightController: ControllerBase
{
  private INightService _nights;
  public NightController(INightService nights)
  {
    _nights = nights;
  }

  [HttpGet]
  [Route("/nights")]
  public ActionResult<IEnumerable<Night>> GetNights()
  {
    try
    {
      var nights = _nights.GetNights();
      return Ok(nights);
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpPost]
  [ActionName(nameof(Night))]
  [Route("/nights")]
  public ActionResult<Night> CreateNight(CreateNightRequest createNightRequest)
  {
    if (createNightRequest == null) return BadRequest();
    try
    {
      return _nights.CreateNight(createNightRequest);
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpDelete]
  [Route("/nights/{nightId}")]
  public ActionResult<Night> DeleteNight(int nightId)
  {
    if (nightId == 0) return BadRequest();
    try
    {
      _nights.DeleteNight(nightId);
      return Ok();
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpPut]
  [Route("/nights/{nightId}")]
  public ActionResult<Night> EditNight(EditNightRequest editNightRequest, int nightId)
  {
    if (editNightRequest == null || nightId == 0) return BadRequest();
    Night? night = _nights.EditNight(editNightRequest);
    if (night == null) return BadRequest();
    return Ok(night);
  }
}
