using Divider.ApiModels;
using Divider.Models;
using Divider.Service;
using Microsoft.AspNetCore.Mvc;

namespace Divider.Controllers;
[Route("api/[controller]")]
[ApiController]
public class PlaceController : ControllerBase
{
  private IPlaceService _places;

  public PlaceController(IPlaceService places)
  {
    _places = places;
  }

  [HttpGet]
  [Route("/place/{placeId}")]
  public ActionResult<IEnumerable<PlaceDTO>> GetPlaceById(int placeId)
  {
    try
    {
      var places = _places.GetPlaceById(placeId);
      return Ok(places);
    }
    catch
    {
      return BadRequest();
    }
  }

  // [HttpGet]
  // [Route("/places/{nightId}")]
  // public ActionResult<IEnumerable<PlaceDTO>> GetPlaces(int nightId)
  // {
  //   try
  //   {
  //     var places = _places.GetPlaces(nightId);
  //     return Ok(places);
  //   }
  //   catch
  //   {
  //     return BadRequest();
  //   }
  // }

  [HttpGet]
  [Route("/places/{placeId}/contacts")]
  public ActionResult<Contact> GetPlaceContacts(int placeId)
  {
    try
    {
      var contacts = _places.GetPlaceContacts(placeId);
      return Ok(contacts);
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
  public ActionResult<Place> EditPlaceName(EditPlaceRequest editPlaceRequest, int placeId)
  {
    if (editPlaceRequest == null || placeId == 0) return BadRequest();
    Place? place = _places.EditPlaceName(editPlaceRequest, placeId);
    if (place == null) return BadRequest();
    return Ok(place);
  }

  [HttpPatch]
  [Route("/places/{placeId}/contacts/{contactId}")]
  public ActionResult<IEnumerable<Contact>> AssignContactToPlace(int placeId, int contactId, bool unassign)
  {
    try
    {
      IEnumerable<Contact> contacts = _places.AssignContactToPlace(placeId, contactId, unassign);
      return Ok(contacts);
    }
    catch (Exception e)
    {
      Console.WriteLine(e);
      return BadRequest();
    }
  }
}