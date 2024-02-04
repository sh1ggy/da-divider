using Divider.ApiModels;
using Divider.Models;
using Divider.Service;
using Microsoft.AspNetCore.Mvc;

namespace Divider.Controllers;

public class PlaceController : ControllerBase
{
  private IPlaceService _places;

  public PlaceController(IPlaceService places)
  {
    _places = places;
  }

  [HttpGet]
  [Route("/places")]
  public ActionResult<IEnumerable<Place>> GetPlaces()
  {
    try
    {
      var places = _places.GetPlaces();
      return Ok(places);
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpPost]
  [ActionName(nameof(Place))]
  [Route("/places")]
  public ActionResult<Place> CreatePlace(CreatePlaceRequest createPlaceRequest)
  {
    if (createPlaceRequest == null) return BadRequest();
    try
    {
      return _places.CreatePlace(createPlaceRequest);
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpDelete]
  [Route("/places/{placeId}")]
  public ActionResult<Place> DeletePlace(int placeId)
  {
    if (placeId == 0) return BadRequest();
    try
    {
      _places.DeletePlace(placeId);
      return Ok();
    }
    catch
    {
      return BadRequest();
    }
  }

  [HttpPut]
  [Route("/places/{placeId}")]
  public ActionResult<Place> EditPlace(EditPlaceRequest editPlaceRequest, int placeId)
  {
    if (editPlaceRequest == null || placeId == 0) return BadRequest();
    Place? place = _places.EditPlace(editPlaceRequest, placeId);
    if (place == null) return BadRequest();
    return Ok(place);
  }
}