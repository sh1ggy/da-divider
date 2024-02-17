using Divider.Models;

namespace Divider.ApiModels;

public class CreatePlaceRequest : BaseRequest
{
  public required string Name { get; set; } = string.Empty;
  public required int NightId { get; set; }
}
public class CreatePlaceResponse : Item
{
  // Empty response
}

public class EditPlaceRequest : BaseRequest
{
  public required Place Place { get; set; }
}

public class PlaceDTO : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  // Many places to one night
  public int NightId { get; set; } // FK property
  public IEnumerable<Contact> Contacts {get;set;} = [];
}