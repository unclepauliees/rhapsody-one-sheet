# Review Site Domain

The temporary review URL is https://unclepauliees.github.io/rhapsody-one-sheet/.

In GoDaddy DNS for project-rhapsody.com, add:

| Type | Name | Value | TTL |
| --- | --- | --- | --- |
| CNAME | 1sheet | unclepauliees.github.io | 1 hour |

Do not change the apex, www, deck, mail or verification records. Do not use domain forwarding. If a record already exists for 1sheet, resolve that conflict before adding the CNAME.

Once DNS resolves, set the custom domain in this repository's Settings > Pages to `1sheet.project-rhapsody.com`, then rerun the Publish review site workflow. The workflow reads the Pages base path automatically, so a fresh deployment is required for the root-domain asset paths. Enable Enforce HTTPS when the certificate is ready.

The review URL is public; noindex metadata is not access control. The repository can remain private on a GitHub plan that supports private-repository Pages.
