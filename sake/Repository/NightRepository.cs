using System.Reflection.Metadata.Ecma335;
using Divider.ApiModels;
using Divider.Models;
using Divider.Service;
using Microsoft.EntityFrameworkCore;

namespace Divider.Repository;

public class NightRepository : INightRepository
{
  IUnitOfWork _unitOfWork;
  public NightRepository(IUnitOfWork unitOfWork)
  {
    _unitOfWork = unitOfWork;
    _unitOfWork.Context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking; //default to no tracking.\
  }
  public void CreateNight(Night night)
  {

    _unitOfWork.Context.Nights.Add(night);
    _unitOfWork.Context.SaveChanges();
    return;
  }

  public Night? DeleteNight(int nightId)
  {
    Night? res = _unitOfWork.Context.Nights.FirstOrDefault(n => n.Id == nightId);
    if (res != null)
    {
      _unitOfWork.Context.Nights.Remove(res);
      _unitOfWork.Context.SaveChanges();
    }
    return res;
  }

  public Night? EditNight(Night night)
  {
    Night? res = _unitOfWork.Context.Nights.FirstOrDefault(n => n.Id == night.Id);
    if (res != null)
    {
      res = night;
      _unitOfWork.Context.Nights.Update(res);
      _unitOfWork.Context.SaveChanges();
    }
    return res;
  }

  public IEnumerable<NightDTO> GetNights()
  {
    IEnumerable<Night> nights = _unitOfWork.Context.Nights.ToList();
    IEnumerable<NightDTO> nightsDTO = [];
    foreach (Night night in nights)
    {
      NightDTO nightDTO = new()
      {
        Id = night.Id,
        Date = night.Date,
      };
      nightsDTO = nightsDTO.Append(nightDTO);
    }
    return nightsDTO;
  }

  public NightDTO GetNightById(int nightId)
  {
    Night night = _unitOfWork.Context.Nights.FirstOrDefault(n => n.Id == nightId);
    NightDTO nightDTO = new()
    {
      Id = night.Id,
      Date = night.Date,
    };
    return nightDTO;
  }

  public IEnumerable<Contact> GetNightContacts(int nightId)
  {
    IEnumerable<Night> nights = _unitOfWork.Context.Nights.Include(n => n.Contacts);
    Night night = nights.FirstOrDefault(n => n.Id == nightId);
    IEnumerable<Contact> contacts = night.Contacts;
    return contacts;
  }

  public IEnumerable<Place> GetNightPlaces(int nightId)
  {
    IEnumerable<Night> nights = _unitOfWork.Context.Nights.Include(n => n.Places);
    Night night = nights.FirstOrDefault(n => n.Id == nightId);
    IEnumerable<Place> places = night.Places;
    return places;
  }

  public IEnumerable<Contact> AssignContactToNight(int nightId, int contactId, bool unassign)
  {
    Night night = _unitOfWork.Context.Nights.FirstOrDefault(n => n.Id == nightId);
    Contact contact = _unitOfWork.Context.Contacts.FirstOrDefault(c => c.Id == contactId);

    Night newNight = new()
    {
      Id = night.Id,
      Date = night.Date,
    };
    if (unassign == true)
    {
      newNight.Contacts.Remove(contact);
    }
    else
    {
      newNight.Contacts.Add(contact);
    }

    _unitOfWork.Context.Nights.Update(newNight);
    _unitOfWork.Context.SaveChanges();

    return newNight.Contacts;
  }
}