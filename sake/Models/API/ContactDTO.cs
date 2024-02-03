using Divider.Models;

namespace Divider.ApiModels;

public class CreateContactRequest : BaseRequest
{
  public string Name { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Mobile { get; set; } = string.Empty;
}

public class CreateContactResponse : Contact
{
  // Empty response
}

public class GetContactsResponse
{
  // Empty response
}

public class EditContactRequest : BaseRequest
{
  public required Contact Contact { get; set; }
}