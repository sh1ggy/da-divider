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
    _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.TrackAll;
    // _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //default to no tracking.
  }

  public IEnumerable<Contact> AssignContactToPlace(int placeId, int contactId)
  {
    Place place = _unitOfWork.Context.Places.Include(p => p.Contacts).FirstOrDefault(p => p.Id == placeId);
    Contact contactToAdd = _unitOfWork.Context.Contacts.FirstOrDefault(c => c.Id == contactId);

    place.Contacts.Add(contactToAdd);
    _unitOfWork.Context.SaveChanges();

    return place.Contacts;
  }

  public IEnumerable<Contact> UnassignContactToPlace(int placeId, int contactId)
  {
    Place place = _unitOfWork.Context.Places.Include(p => p.Contacts).FirstOrDefault(p => p.Id == placeId);
    Contact contactToRemove = _unitOfWork.Context.Contacts.FirstOrDefault(c => c.Id == contactId);

    place.Contacts.Remove(contactToRemove);
    _unitOfWork.Context.SaveChanges();

    return place.Contacts;
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

  public Place? EditPlaceName(Place place)
  {
    Place placeToEdit = _unitOfWork.Context.Places.FirstOrDefault(p => p.Id == place.Id);
    if (placeToEdit == null)
    {
      throw new ArgumentException("No place found");
    }
    placeToEdit.Name = place.Name;
    _unitOfWork.Context.SaveChanges();
    return place;
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
      .Include(p => p.Contacts)
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
        Contacts = place.Contacts,
      };
      foreach (Contact contact in place.Contacts)
      {
        Console.WriteLine(contact.Id);
      }

      placesDTO = placesDTO.Append(placeDTO);
    }
    return placesDTO;
  }

  public Place GetPlaceById(int placeId)
  {
    return _unitOfWork.Context.Places.Include(p => p.Contacts).FirstOrDefault(p => p.Id == placeId);
  }
}