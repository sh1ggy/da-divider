using Divider.ApiModels;
using Divider.Models;
using Microsoft.EntityFrameworkCore;

namespace Divider.Repository;

public class PlaceRepository : IPlaceRepository
{
  private IUnitOfWork _unitOfWork;
  public PlaceRepository(IUnitOfWork unitOfWork)
  {
    _unitOfWork = unitOfWork;
    _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //default to no tracking.\
  }

  public IEnumerable<Contact> AssignContactToPlace(int placeId, int contactId, bool unassign)
  {
    Place place = _unitOfWork.Context.Places.FirstOrDefault(p => p.Id == placeId);
    Contact contact = _unitOfWork.Context.Contacts.FirstOrDefault(c => c.Id == contactId);

    Place newPlace = new()
    {
      Id = place.Id,
      Name = place.Name,
      NightId = place.NightId,
    };
    if (unassign == true)
    {
      newPlace.Contacts.Remove(contact);
    }
    else
    {
      newPlace.Contacts.Add(contact);
    }

    _unitOfWork.Context.Places.Update(newPlace);
    _unitOfWork.Context.SaveChanges();

    return newPlace.Contacts;
  }

  public void CreatePlace(Place place)
  {
    _unitOfWork.Context.Places.Add(place);
    _unitOfWork.Context.SaveChanges();
  }

  public Place? DeletePlace(int placeId)
  {
    Place? res = _unitOfWork.Context.Places.FirstOrDefault(p => p.Id == placeId);
    if (res != null)
    {
      _unitOfWork.Context.Places.Remove(res);
      _unitOfWork.Context.SaveChanges();
    }
    return null;
  }

  public Place? EditPlace(Place place)
  {
    Place? res = _unitOfWork.Context.Places.FirstOrDefault(p => p.Id == place.Id);
    if (res != null)
    {
      res = place;
      _unitOfWork.Context.Places.Update(res);
      _unitOfWork.Context.SaveChanges();
      return res;
    }
    return null;
  }

  public IEnumerable<Contact> GetPlaceContacts(int placeId)
  {
    IEnumerable<Place> places = _unitOfWork.Context.Places.Include(p => p.Contacts);
    Place place = places.FirstOrDefault(p => p.Id == placeId);
    IEnumerable<Contact> contacts = place.Contacts;
    return contacts;
  }

  public IEnumerable<PlaceDTO> GetPlaces(int nightId)
  {
    List<Place> places = _unitOfWork.Context.Places
      .Where(p => p.NightId == nightId)
      .ToList();
    IEnumerable<PlaceDTO> placesDTO = [];
    foreach (Place place in places)
    {
      PlaceDTO placeDTO = new()
      {
        Id = place.Id,
        Name = place.Name,
        NightId = place.NightId,
      };
      placesDTO = placesDTO.Append(placeDTO);
    }
    return placesDTO;
  }
}